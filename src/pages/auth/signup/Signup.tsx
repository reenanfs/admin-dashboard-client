import {
  Box,
  Button,
  Paper,
  TextField,
  Container,
  Typography,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ValidationMessages } from 'constants/validationMessages';
import { LOCAL_SIGNUP } from './signupQueries';
import { ApolloError, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { IAuthResponse, ISignupFields } from '../authTypes';

const signupValidationSchema = yup.object({
  name: yup.string().required(ValidationMessages.REQUIRED),
  email: yup
    .string()
    .email(ValidationMessages.EMAIL)
    .required(ValidationMessages.REQUIRED),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      ValidationMessages.PASSWORD
    )
    .required(ValidationMessages.REQUIRED),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], ValidationMessages.PASSWORD_MATCH)
    .required(ValidationMessages.REQUIRED),
});

const Signup = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFields & { confirmPassword: string }>({
    resolver: yupResolver(signupValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [authErrorMessage, setAuthErrorMessage] = useState<string>('');

  const { login } = useAuth();

  const [localSignup, { data, loading }] = useMutation<
    { localSignup: IAuthResponse },
    { input: ISignupFields }
  >(LOCAL_SIGNUP);

  useEffect(() => {
    if (data) {
      const {
        localSignup: { access_token, refresh_token },
      } = data;

      login(access_token, refresh_token);
    }
  }, [loading, data, login]);

  const onSubmit: SubmitHandler<ISignupFields> = async data => {
    const { name, email, password } = data;
    try {
      await localSignup({
        variables: {
          input: {
            name,
            email,
            password,
          },
        },
      });
    } catch (serverError: unknown) {
      if (serverError instanceof ApolloError) {
        const { extensions } = serverError.graphQLErrors[0];
        const statusCode = (extensions as { response: { statusCode: number } })
          .response.statusCode;
        if (statusCode === 401) {
          setAuthErrorMessage(ValidationMessages.SERVER_INVALID_CREDENTIALS);
        } else if (statusCode === 500) {
          setAuthErrorMessage(ValidationMessages.SERVER_INTERNAL_ERROR);
        }
      } else {
        console.log('Unknown error');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            m: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h2" sx={{ mt: 2 }}>
            Sign Up
          </Typography>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name"
                size="small"
                fullWidth
                margin="normal"
                {...field}
                helperText={
                  !!errors.name && errors.name.message
                    ? errors.name.message
                    : authErrorMessage
                }
                error={!!errors.name || !!authErrorMessage}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="Email"
                size="small"
                fullWidth
                margin="normal"
                {...field}
                helperText={
                  !!errors.email && errors.email.message
                    ? errors.email.message
                    : authErrorMessage
                }
                error={!!errors.email || !!authErrorMessage}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                label="Password"
                type="password"
                size="small"
                fullWidth
                margin="normal"
                {...field}
                helperText={
                  !!errors.password && errors.password.message
                    ? errors.password.message
                    : authErrorMessage
                }
                error={!!errors.password || !!authErrorMessage}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                label="Confirm Password"
                type="password"
                size="small"
                fullWidth
                margin="normal"
                {...field}
                helperText={
                  !!errors.confirmPassword && errors.confirmPassword.message
                    ? errors.confirmPassword.message
                    : authErrorMessage
                }
                error={!!errors.confirmPassword || !!authErrorMessage}
              />
            )}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 2, mb: 3 }}
          >
            Sign up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
