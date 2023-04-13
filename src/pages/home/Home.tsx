import { AccountCircle, Assignment, Group } from '@mui/icons-material';
import { Grid, Paper, Typography } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';

import NoProjectBox from '../../components/box/NoProjectBox';
import PageWrapperPaper from 'components/papers/PageWrapperPaper';
import { HOME_DATA } from './homeQueries';
import { IHomeData } from './homeTypes';
import { useCurrentUser } from 'hooks/useCurrentUser';
import LoadingPage from 'pages/status/loading/Loading';

const HomePage = (): JSX.Element => {
  const { user } = useCurrentUser();
  const [getHomeData, { data: homeData, loading }] = useLazyQuery<IHomeData>(
    HOME_DATA,
    {
      variables: {
        input: {
          id: user!.currentProjectId,
        },
      },
    }
  );

  useEffect(() => {
    if (user && user.currentProjectId) {
      getHomeData();
    }
  }, [getHomeData, user]);

  const hasNoProject = () => {
    return !homeData?.project;
  };

  const totalUsers = homeData?.project?.projectMemberships?.length || 0;
  const totalTasks = homeData?.project?.tasks?.length || 0;

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <PageWrapperPaper>
      {hasNoProject() ? (
        <>
          <NoProjectBox />
        </>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ height: 120, p: 2 }}>
                <Grid container alignItems="center">
                  <Grid item xs={3}>
                    <Assignment fontSize="large" />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h5" component="h2">
                      {totalTasks}
                    </Typography>
                    <Typography color="textSecondary">Tasks</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ height: 120, p: 2 }}>
                <Grid container alignItems="center">
                  <Grid item xs={3}>
                    <Group fontSize="large" />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h5" component="h2">
                      {totalUsers}
                    </Typography>
                    <Typography color="textSecondary">Users</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ height: 120, p: 2 }}>
                <Grid container alignItems="center">
                  <Grid item xs={3}>
                    <AccountCircle fontSize="large" />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h5" component="h2">
                      {user?.name}
                    </Typography>
                    <Typography color="textSecondary">Logged in as</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                sx={{
                  height: 400,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              >
                <Grid>
                  <Typography variant="h5" component="h2">
                    Under Construction...
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </PageWrapperPaper>
  );
};

export default HomePage;
