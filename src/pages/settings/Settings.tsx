import { Box, Grid, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useNavigate, useSearchParams } from 'react-router-dom';

import PageWrapperPaper from 'components/papers/PageWrapperPaper';
import UserProfile from './components/user-profile/userProfile';
import ProjectManagement from './components/project-management/projectManagement';

const Settings = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(`/settings?tab=${newValue}`);
  };

  const currentTab = searchParams.get('tab') ?? '1';

  return (
    <PageWrapperPaper>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="User Profile" value="1" />
            <Tab label="Project Management" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <UserProfile />
        </TabPanel>
        <TabPanel value="2">
          <Grid container>
            <ProjectManagement />
          </Grid>
        </TabPanel>
      </TabContext>
    </PageWrapperPaper>
  );
};

export default Settings;
