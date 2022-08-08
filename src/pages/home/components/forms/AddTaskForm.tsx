import { Box, TextField, Grid, MenuItem, Checkbox } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';

import { ValidationMessages } from 'constants/validationMessages';
import { useQuery } from '@apollo/client';
import { IPeopleData } from 'types/peopleTypes';
import { GET_USERS } from 'graphql/peopleQueries';
import { ADD_FORM_ID } from 'constants/componentConstants';
import { ITaskCreationFields } from 'types/homeTypes.ts';

interface ITaskFormProps {
  onSubmit: SubmitHandler<ITaskCreationFields>;
}

const taskValidationSchema = yup.object({
  taskName: yup.string().required(ValidationMessages.REQUIRED),
  description: yup.string().nullable(),
  userId: yup.string().required(ValidationMessages.REQUIRED),
  startDate: yup.date().nullable().typeError(ValidationMessages.DATE),
  dueDate: yup.date().nullable().typeError(ValidationMessages.DATE),
  completed: yup.boolean().nullable().typeError(ValidationMessages.BOOLEAN),
});

const AddTaskForm = ({ onSubmit }: ITaskFormProps): JSX.Element => {
  const [startDateCheckboxDisabled, setStartDateCheckboxDisabled] =
    useState(true);
  const [dueDateCheckboxDisabled, setDueDateCheckboxDisabled] = useState(false);

  const [startDateTemp, setStartDateTemp] = useState<Date | null | undefined>(
    null
  );
  const [dueDateTemp, setDueDateTemp] = useState<Date | null | undefined>(null);

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ITaskCreationFields>({
    resolver: yupResolver(taskValidationSchema),
    defaultValues: {
      taskName: '',
      description: '',
      userId: '',
      startDate: null,
      dueDate: new Date(),
      completed: false,
    },
  });

  const { loading, data } = useQuery<IPeopleData>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  });

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

  const handleStartDateCheckboxChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setStartDateCheckboxDisabled(!target.checked);
    if (!target.checked) {
      setStartDateTemp(getValues('startDate'));
      setValue('startDate', null);
    } else {
      setValue('startDate', startDateTemp);
    }
  };

  const handleDueDateCheckboxChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setDueDateCheckboxDisabled(!target.checked);
    if (!target.checked) {
      setDueDateTemp(getValues('dueDate'));
      setValue('dueDate', null);
    } else {
      setValue('dueDate', dueDateTemp);
    }
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      id={ADD_FORM_ID}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container rowSpacing={2} spacing={2} width={570}>
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
          <Checkbox
            name="startDateCheckbox"
            checked={!startDateCheckboxDisabled}
            onChange={handleStartDateCheckboxChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="startDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  label="Start Date"
                  disabled={startDateCheckboxDisabled}
                  minDateTime={new Date()}
                  renderInput={props => (
                    <TextField
                      sx={{
                        width: 225,
                      }}
                      id="startDate"
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
          <Checkbox
            name="dueDateCheckbox"
            checked={!dueDateCheckboxDisabled}
            onChange={handleDueDateCheckboxChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="dueDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  label="Due Date"
                  disabled={dueDateCheckboxDisabled}
                  minDateTime={new Date()}
                  renderInput={props => (
                    <TextField
                      sx={{ width: 225 }}
                      size="small"
                      id="dueDate"
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
                id="person"
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

export default AddTaskForm;
