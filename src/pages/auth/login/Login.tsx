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
import { Link } from 'react-router-dom';
import { ValidationMessages } from 'constants/validationMessages';
import { LOCAL_SIGNIN } from './loginQueries';
import { ApolloError, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { IAuthResponse } from 'types/authTypes';

export interface ILoginFields {
  email: string;
  password: string;
}

const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email(ValidationMessages.EMAIL)
    .required(ValidationMessages.REQUIRED),
  password: yup.string().required(ValidationMessages.REQUIRED),
});

const Login = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFields>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleLogin } = useAuth();

  const [authErrorMessage, setAuthErrorMessage] = useState<string>('');

  const [localSignin, { data, loading }] = useMutation<
    { localSignin: IAuthResponse },
    { input: ILoginFields }
  >(LOCAL_SIGNIN);

  useEffect(() => {
    if (!data?.localSignin) {
      return;
    }

    const {
      localSignin: { access_token, refresh_token, credential },
    } = data;

    handleLogin(access_token, refresh_token, credential);
  }, [loading, data, handleLogin]);

  const onSubmit: SubmitHandler<ILoginFields> = async data => {
    const { email, password } = data;
    try {
      await localSignin({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
    } catch (error: unknown) {
      if (error instanceof ApolloError) {
        let statusCode: number;
        let serverErrorMessage: string = '';

        if (error.graphQLErrors.length) {
          const { extensions } = error.graphQLErrors[0];
          statusCode = (extensions as { response: { statusCode: number } })
            .response.statusCode;

          serverErrorMessage = (extensions as { response: { message: string } })
            .response.message;
        } else {
          statusCode = 400;
        }

        switch (statusCode) {
          case 401:
            setAuthErrorMessage(ValidationMessages.SERVER_INVALID_CREDENTIALS);
            break;
          case 400:
            setAuthErrorMessage(ValidationMessages.SERVER_BAD_REQUEST);
            break;
          default:
            setAuthErrorMessage(serverErrorMessage);
        }
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
            Login
          </Typography>
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
                helperText={!!errors.password && errors.password.message}
                error={!!errors.email || !!authErrorMessage}
              />
            )}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 2, mb: 3 }}
          >
            Login
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
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Doesn't have an account? <Link to="/register">Create one now!</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
