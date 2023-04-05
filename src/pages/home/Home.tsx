import NoProjectBox from '../../components/box/NoProjectBox';
import PageWrapperPaper from 'components/papers/PageWrapperPaper';

import { AccountCircle, Assignment, Group } from '@mui/icons-material';
import { Grid, Paper, Typography } from '@mui/material';
import GenericContainedAddButton from 'components/buttons/GenericContainedAddButton';
import LoadingPage from 'pages/status/loading/Loading';
import { GET_PROJECTS } from 'graphql/projectsQueries';
import { ProjectsData } from 'types/projectTypes';
import { useQuery } from '@apollo/client';

interface Task {
  name: string;
  startDate: string;
  dueDate: string;
  completionDate: string;
  completed: boolean;
}

interface User {
  name: string;
  email: string;
}

const tasks: Task[] = [
  {
    name: 'Complete project',
    startDate: '2023-04-01 10:00:00',
    dueDate: '2023-04-05 17:00:00',
    completionDate: '',
    completed: false,
  },
  {
    name: 'Send email',
    startDate: '2023-04-02 09:30:00',
    dueDate: '2023-04-03 12:00:00',
    completionDate: '',
    completed: true,
  },
  {
    name: 'Review code',
    startDate: '2023-04-03 14:00:00',
    dueDate: '2023-04-04 18:00:00',
    completionDate: '',
    completed: false,
  },
];

const users: User[] = [
  { name: 'John Doe', email: 'john.doe@example.com' },
  { name: 'Jane Smith', email: 'jane.smith@example.com' },
  { name: 'Bob Johnson', email: 'bob.johnson@example.com' },
];

const HomePage = (): JSX.Element => {
  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);
  const numUsers = users.length;

  const { data, loading } = useQuery<ProjectsData>(GET_PROJECTS);

  const IsThereNoProjects = () => !data?.projects?.length;

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <PageWrapperPaper>
      {IsThereNoProjects() ? (
        <>
          <NoProjectBox />
        </>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ height: 120, p: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs={3}>
                  <Assignment fontSize="large" />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h5" component="h2">
                    {tasks.length}
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
                    {numUsers}
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
                    John Doe
                  </Typography>
                  <Typography color="textSecondary">Logged in as</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={3}>
              <GenericContainedAddButton text="Add Project" />
            </Grid>
          </Grid>
        </Grid>
      )}
    </PageWrapperPaper>
  );
};

export default HomePage;
