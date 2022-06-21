import { Box, TextField, Grid } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ValidationMessages } from 'constants/validationMessages';
import { PEOPLE_FORM_ID } from 'pages/people/peopleConstants';
import { Person, IPersonFields } from 'pages/people/peopleTypes';

interface IPersonFormProps {
  onSubmit: SubmitHandler<Person>;
  defaultValues: Person;
}

const personValidationSchema = yup.object({
  name: yup.string().required(ValidationMessages.REQUIRED),
  role: yup.string().required(ValidationMessages.REQUIRED),
  email: yup
    .string()
    .email(ValidationMessages.EMAIL)
    .required(ValidationMessages.REQUIRED),
});

const PersonForm = ({
  onSubmit,
  defaultValues,
}: IPersonFormProps): JSX.Element => {
  const { id, name, role, email } = defaultValues;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPersonFields>({
    resolver: yupResolver(personValidationSchema),
    defaultValues: {
      name,
      role,
      email,
    },
  });

  return (
    <Box
      component="form"
      autoComplete="off"
      id={PEOPLE_FORM_ID}
      onSubmit={handleSubmit(data => onSubmit({ id, ...data }))}
    >
      <Grid container direction="column" rowSpacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            size="small"
            {...register('name')}
            helperText={!!errors.name && errors.name.message}
            error={!!errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Role"
            size="small"
            {...register('role')}
            helperText={!!errors.role && errors.role.message}
            error={!!errors.role}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            size="small"
            {...register('email')}
            helperText={!!errors.email && errors.email.message}
            error={!!errors.email}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonForm;