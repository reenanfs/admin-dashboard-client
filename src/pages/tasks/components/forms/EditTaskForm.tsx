import {
  Box,
  TextField,
  Grid,
  MenuItem,
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import { useForm, SubmitHandler, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { ValidationMessages } from 'constants/validationMessages';
import { EDIT_FORM_ID } from 'constants/componentConstants';
import { ITask, ITaskUpdateFields } from 'types/tasksTypes.ts';
import { useEffect, useState } from 'react';
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
  const [startDateCheckboxDisabled, setStartDateCheckboxDisabled] =
    useState(true);
  const [dueDateCheckboxDisabled, setDueDateCheckboxDisabled] = useState(true);

  const [startDateTemp, setStartDateTemp] = useState<Date | null | undefined>(
    null
  );
  const [dueDateTemp, setDueDateTemp] = useState<Date | null | undefined>(null);

  const {
    setValue,
    getValues,
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

  const completedWatch = useWatch({
    name: 'completed',
    control,
  });

  const { loading, data } = useQuery<IPeopleData>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!loading && user) {
      setValue('userId', user.id);
    }
  }, [user, loading, setValue]);

  useEffect(() => {
    if (startDate) {
      setStartDateCheckboxDisabled(false);
    }

    if (dueDate) {
      setDueDateCheckboxDisabled(false);
    }
  }, [startDate, dueDate]);

  useEffect(() => {
    let completedWatchBool: boolean | undefined;

    if (typeof completedWatch === 'string') {
      let completedWatchStr: string = completedWatch;
      completedWatchBool = completedWatchStr.toLowerCase() === 'true';
    } else {
      completedWatchBool = completedWatch;
    }

    if (completedWatchBool) {
      setValue('completionDate', new Date());
    } else {
      setValue('completionDate', null);
    }
  }, [completedWatch, setValue]);

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
      id={EDIT_FORM_ID}
      onSubmit={handleSubmit(data => onSubmit({ id, ...data }))}
    >
      <Grid container rowSpacing={2} spacing={2} width={620}>
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
          <Box justifyContent="right" display="flex">
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
          </Box>
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
          <Box justifyContent="right" display="flex">
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
                        id="dueDate"
                        sx={{
                          width: 225,
                        }}
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
          </Box>
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
        <Grid item xs={6}>
          <Box justifyContent="right" display="flex">
            <Controller
              name="completed"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <RadioGroup sx={{ ml: 1 }} row {...field}>
                    <FormControlLabel
                      value={true}
                      control={
                        <Radio color="success" sx={{ color: 'success.main' }} />
                      }
                      label="Completed"
                    />
                    <FormControlLabel
                      sx={{ mr: 0 }}
                      value={false}
                      control={
                        <Radio color="warning" sx={{ color: 'warning.main' }} />
                      }
                      label="Not Completed"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditTaskForm;
