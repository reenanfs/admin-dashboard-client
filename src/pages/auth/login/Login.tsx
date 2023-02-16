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
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ValidationMessages } from 'constants/validationMessages';

export interface ILoginFields {
  email: string;
  password: string;
}

const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email(ValidationMessages.EMAIL)
    .required(ValidationMessages.REQUIRED),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{12,}$/,
      ValidationMessages.PASSWORD
    )
    .required(ValidationMessages.REQUIRED),
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

  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Box
          component="form"
          autoComplete="off"
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
          <TextField label="Email" size="small" fullWidth margin="normal" />
          <TextField
            label="Password"
            type="password"
            size="small"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" fullWidth sx={{ mt: 2, mb: 3 }}>
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
