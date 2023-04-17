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
import { ADD_FORM_ID } from 'constants/componentConstants';
import { ITaskCreationInput, ITasksPagePeople } from 'pages/tasks/tasksTypes';
import { GET_TASKS_PAGE_USERS } from 'pages/tasks/tasksQueries';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { getTomorrowDate } from 'utils/getTomorrowDate';

interface ITaskFormProps {
  onSubmit: SubmitHandler<ITaskCreationInput>;
}

const taskValidationSchema = yup.object({
  name: yup.string().required(ValidationMessages.REQUIRED),
  description: yup.string().nullable(),
  userId: yup.string().required(ValidationMessages.REQUIRED),
  startDate: yup.date().nullable().typeError(ValidationMessages.DATE),
  dueDate: yup.date().nullable().typeError(ValidationMessages.DATE),
  completed: yup.boolean().nullable().typeError(ValidationMessages.BOOLEAN),
});

const AddTaskForm = ({ onSubmit }: ITaskFormProps): JSX.Element => {
  const { currentUser } = useCurrentUser();

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
  } = useForm<ITaskCreationInput>({
    resolver: yupResolver(taskValidationSchema),
    defaultValues: {
      name: '',
      description: '',
      userId: '',
      startDate: null,
      dueDate: getTomorrowDate(),
      completed: false,
    },
  });

  const { loading, data } = useQuery<ITasksPagePeople>(GET_TASKS_PAGE_USERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      input: {
        id: currentUser?.currentProjectId,
      },
    },
  });

  const renderSelectOptions = (): JSX.Element[] | JSX.Element => {
    if (!loading && data) {
      const {
        project: { projectMemberships },
      } = data;
      return projectMemberships.map(({ user }) => (
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
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Task Name"
                size="small"
                fullWidth
                {...field}
                helperText={!!errors.name && errors.name.message}
                error={!!errors.name}
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
