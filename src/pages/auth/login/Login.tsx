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
import { Link, useNavigate } from 'react-router-dom';
import { ValidationMessages } from 'constants/validationMessages';
import { LOCAL_SIGNIN } from './loginQueries';
import { ApolloError, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { routesPaths } from 'constants/routesConstants';

interface ILoginFields {
  email: string;
  password: string;
}

interface IlocalSignInResponse {
  access_token: string;
  refresh_token: string;
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

  const [authErrorMessage, setAuthErrorMessage] = useState<string>('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const [localSignin, { data, loading }] = useMutation<
    { localSignin: IlocalSignInResponse },
    { input: ILoginFields }
  >(LOCAL_SIGNIN);

  useEffect(() => {
    if (data) {
      const {
        localSignin: { access_token, refresh_token },
      } = data;
      // console.log(access_token);
      login(access_token, refresh_token);
      navigate(routesPaths.HOME);
    }
  }, [loading, data, login, navigate]);

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
            Entrar
          </Button>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Ainda não possui uma conta? <Link to="/register">Crie agora!</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
