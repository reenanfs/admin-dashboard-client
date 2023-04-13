import { Box, Grid, Tab } from '@mui/material';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useNavigate, useSearchParams } from 'react-router-dom';

import PageWrapperPaper from 'components/papers/PageWrapperPaper';
import UserProfile from './components/userProfile';

const Settings = (): JSX.Element => {
  const { user } = useCurrentUser();

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
          <TabList onChange={handleChange}>
            <Tab label="User Profile" value="1" />
            <Tab label="Project Management" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <UserProfile />
        </TabPanel>
        <TabPanel value="2">
          <Grid container>Item Two</Grid>
        </TabPanel>
      </TabContext>
    </PageWrapperPaper>
  );
};

export default Settings;
