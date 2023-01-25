import {
  Box,
  Button,
  Paper,
  TextField,
  Container,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Login = (): JSX.Element => {
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
          <Typography component="h1" variant="h2">
            Login
          </Typography>
          <TextField label="Username" size="small" fullWidth margin="normal" />
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
          <Typography variant="subtitle1">
            Ainda não possui uma conta? <Link to="/register">Crie agora!</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
