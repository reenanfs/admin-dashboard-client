import { Box, TextField, Grid } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ValidationMessages } from 'constants/validationMessages';
import { PEOPLE_FORM_ID } from 'pages/people/peopleConstants';
import { IPersonFields } from 'pages/people/peopleTypes';
import { IPerson } from 'types/peopleTypes';
import { EDIT_FORM_ID } from 'constants/componentConstants';
import { ITask } from 'pages/home/homeTypes';

interface IPersonFormProps {
  onSubmit: SubmitHandler<ITask>;
  defaultValues: ITask;
}

const personValidationSchema = yup.object({
  name: yup.string().required(ValidationMessages.REQUIRED),
  role: yup.string().required(ValidationMessages.REQUIRED),
  email: yup
    .string()
    .email(ValidationMessages.EMAIL)
    .required(ValidationMessages.REQUIRED),
});

const EditPersonForm = ({
  onSubmit,
  defaultValues,
}: IPersonFormProps): JSX.Element => {
  const { id, taskName, description } = defaultValues;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>({
    resolver: yupResolver(personValidationSchema),
    defaultValues: {
      taskName,
    },
  });

  return <div></div>;
};

export default EditPersonForm;
