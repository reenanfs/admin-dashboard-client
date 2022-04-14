import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';

import Layout from 'components/layout/Layout';
import Tasks from 'pages/tasks/Tasks';
import People from 'pages/people/People';
import Support from 'pages/support/Support';

const App = (): JSX.Element => {
  const theme = createTheme({
    palette: {},
    components: {
      MuiSvgIcon: {
        defaultProps: {
          color: 'primary',
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/people" element={<People />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
