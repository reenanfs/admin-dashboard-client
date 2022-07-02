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
});

const AddTaskForm = ({ onSubmit }: ITaskFormProps): JSX.Element => {
  const [dateCheckboxesDisabled, setDateCheckboxesDisabled] = useState({
    startDateCheckbox: true,
    dueDateCheckbox: false,
  });

  const {
    control,
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
    },
  });

  const { loading, data } = useQuery<IPeopleData>(GET_USERS);

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

  const handleCheckboxesChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setDateCheckboxesDisabled(state => ({
      ...state,
      [target.name]: !target.checked,
    }));
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      id={ADD_FORM_ID}
      onSubmit={handleSubmit(data => {
        if (dateCheckboxesDisabled.startDateCheckbox) {
          data.startDate = null;
        } else if (dateCheckboxesDisabled.dueDateCheckbox) {
          data.dueDate = null;
        }
        return onSubmit(data);
      })}
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
          <Checkbox
            name="startDateCheckbox"
            checked={!dateCheckboxesDisabled.startDateCheckbox}
            onChange={handleCheckboxesChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="startDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  label="Start Date"
                  minDateTime={new Date()}
                  disabled={dateCheckboxesDisabled.startDateCheckbox}
                  renderInput={props => (
                    <TextField
                      sx={{
                        width: 225,
                      }}
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
            checked={!dateCheckboxesDisabled.dueDateCheckbox}
            onChange={handleCheckboxesChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="dueDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  label="Due Date"
                  disabled={dateCheckboxesDisabled.dueDateCheckbox}
                  minDateTime={new Date()}
                  renderInput={props => (
                    <TextField
                      sx={{ width: 225 }}
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

export default AddTaskForm;