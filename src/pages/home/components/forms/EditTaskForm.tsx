import { Box, TextField, Grid, MenuItem } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { ValidationMessages } from 'constants/validationMessages';
import { EDIT_FORM_ID } from 'constants/componentConstants';
import { ITask } from 'pages/home/homeTypes';
import { ITaskUpdateFields } from 'types/homeTypes.ts';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { IPeopleData } from 'types/peopleTypes';
import { GET_USERS } from 'graphql/peopleQueries';

interface ITaskFormProps {
  onSubmit: SubmitHandler<ITask>;
  defaultValues: ITask;
}

const taskValidationSchema = yup.object({
  taskName: yup.string().required(ValidationMessages.REQUIRED),
  description: yup.string().nullable(),
  userId: yup.string().required(ValidationMessages.REQUIRED),
  startDate: yup.date().nullable().typeError(ValidationMessages.DATE),
  dueDate: yup.date().nullable().typeError(ValidationMessages.DATE),
  completionDate: yup.date().nullable().typeError(ValidationMessages.DATE),
  completed: yup.boolean().nullable().typeError(ValidationMessages.BOOLEAN),
});

const EditTaskForm = ({
  onSubmit,
  defaultValues: {
    id,
    taskName,
    description,
    user,
    startDate,
    dueDate,
    completionDate,
    completed,
  },
}: ITaskFormProps): JSX.Element => {
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITaskUpdateFields>({
    resolver: yupResolver(taskValidationSchema),
    defaultValues: {
      taskName,
      description,
      userId: '',
      startDate,
      dueDate,
      completionDate,
      completed,
    },
  });

  const { loading, data } = useQuery<IPeopleData>(GET_USERS);

  useEffect(() => {
    if (!loading && user) {
      setValue('userId', user.id);
    }
  }, [user, loading, setValue]);

  const renderSelectOptions = (): JSX.Element[] | JSX.Element => {
    if (!loading && data) {
      return data.users.map(user => (
        <MenuItem value={user.id} key={user.id}>
          {user.name}
        </MenuItem>
      ));
    }

    return <MenuItem value="" key=""></MenuItem>;
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      id={EDIT_FORM_ID}
      onSubmit={handleSubmit(data => onSubmit({ id, ...data }))}
    >
      <Grid container rowSpacing={2} spacing={2}>
        <Grid item xs={6}>
          <Controller
            name="taskName"
            control={control}
            render={({ field }) => (
              <TextField
                label="Task Name"
                size="small"
                fullWidth
                {...field}
                helperText={!!errors.taskName && errors.taskName.message}
                error={!!errors.taskName}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="startDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  label="Start Date"
                  minDateTime={new Date()}
                  renderInput={props => (
                    <TextField
                      size="small"
                      {...props}
                      helperText={
                        !!errors.startDate && errors.startDate.message
                      }
                      error={!!errors.startDate}
                    />
                  )}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                label="Description"
                size="small"
                fullWidth
                multiline
                rows={4}
                {...field}
                helperText={!!errors.description && errors.description.message}
                error={!!errors.description}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="dueDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  label="Due Date"
                  minDateTime={new Date()}
                  renderInput={props => (
                    <TextField
                      size="small"
                      {...props}
                      helperText={!!errors.dueDate && errors.dueDate.message}
                      error={!!errors.dueDate}
                    />
                  )}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="userId"
            control={control}
            render={({ field }) => (
              <TextField
                label="Person"
                size="small"
                select
                fullWidth
                {...field}
                helperText={!!errors.userId && errors.userId.message}
                error={!!errors.userId}
              >
                {renderSelectOptions()}
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditTaskForm;
