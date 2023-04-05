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
    mode: 'onChange',
    resolver: yupResolver(signupValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [authErrorMessage, setAuthErrorMessage] = useState<string>('');

  const { handleLogin } = useAuth();

  const [localSignup, { data, loading }] = useMutation<
    { localSignup: IAuthResponse },
    { input: ISignupFields }
  >(LOCAL_SIGNUP);

  useEffect(() => {
    if (data) {
      const {
        localSignup: { access_token, refresh_token },
      } = data;

      handleLogin(access_token, refresh_token);
    }
  }, [loading, data, handleLogin]);

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
    } catch (error: unknown) {
      if (error instanceof ApolloError) {
        const { extensions } = error.graphQLErrors[0];

        const serverErrorMessage = (
          extensions as { response: { message: string } }
        ).response.message;

        setAuthErrorMessage(serverErrorMessage);
      } else {
        setAuthErrorMessage('Unknown error');
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
                helperText={!!errors.name && errors.name.message}
                error={!!errors.name}
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
                helperText={!!errors.email && errors.email.message}
                error={!!errors.email}
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
                helperText={!!errors.password && errors.password.message}
                error={!!errors.password}
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
                }
                error={!!errors.confirmPassword}
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
          {!!authErrorMessage && (
            <Paper
              sx={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '10px',
                border: '1px solid #f5c6cb',
                width: '100%',
                mb: 2,
                textAlign: 'center',
              }}
            >
              {authErrorMessage}
            </Paper>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
