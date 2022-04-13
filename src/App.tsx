import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';

import Layout from 'components/layout/Layout';
import Dashboard from 'pages/Dashboard';

const App = (): JSX.Element => {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#eceff1',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
