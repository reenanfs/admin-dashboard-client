import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { VictoryPie, VictoryBar, VictoryChart, VictoryAxis } from 'victory';

interface Task {
  name: string;
  startDate: string;
  dueDate: string;
  completionDate: string;
  completed: boolean;
  user: User;
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
    completionDate: '2023-04-05 17:00:00',
    completed: false,
    user: { name: 'John Doe', email: 'john.doe@example.com' },
  },
  {
    name: 'Send email',
    startDate: '2023-04-02 09:30:00',
    dueDate: '2023-04-03 12:00:00',
    completionDate: '2023-04-03 12:00:00',
    completed: true,
    user: { name: 'John Doe', email: 'john.doe@example.com' },
  },
  {
    name: 'Review code',
    startDate: '2023-04-03 14:00:00',
    dueDate: '2023-04-04 18:00:00',
    completionDate: '2023-04-05 17:00:00',
    completed: false,
    user: { name: 'John Doe', email: 'john.doe@example.com' },
  },
];

const users: User[] = [
  { name: 'John Doe', email: 'john.doe@example.com' },
  { name: 'Jane Smith', email: 'jane.smith@example.com' },
  { name: 'Bob Johnson', email: 'bob.johnson@example.com' },
];

const Dashboard = (): JSX.Element => {
  // Calculate task completion rate
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = Math.round(
    (completedTasks.length / tasks.length) * 100
  );

  // Calculate average task duration
  const taskDurations = tasks
    .filter(task => task.completed)
    .map(task => {
      const startDate = new Date(task.startDate).getTime();
      const completionDate = new Date(task.completionDate || '').getTime();
      return completionDate - startDate;
    });

  const avgTaskDuration = Math.round(
    taskDurations.reduce((sum, duration) => sum + duration, 0) /
      taskDurations.length
  );

  // Calculate task count by user
  const taskCountsByUser = users.map(user => {
    const taskCount = tasks.filter(task => task.user.name === user.name).length;
    return { user: user.name, taskCount };
  });

  // Define the data and options for each chart
  const completionRateData = [
    { x: 'Completed Tasks', y: completedTasks.length },
    { x: 'Incomplete Tasks', y: tasks.length - completedTasks.length },
  ];
  const taskDurationData = taskDurations.map((duration, index) => ({
    x: `Task ${index + 1}`,
    y: duration,
  }));
  const taskCountData = taskCountsByUser.map(data => ({
    x: data.user,
    y: data.taskCount,
  }));

  // Define styles
  const chartStyles = {
    width: 400,
    height: 400,
    margin: 'auto',
  };
  const cardStyles = {
    mt: 2,
    mb: 2,
  };
  const titleStyles = {
    mb: 2,
  };

  // Render the component with charts
  return (
    <>
      <Button onClick={() => console.log(avgTaskDuration)}>Test</Button>
      <Card sx={cardStyles}>
        <CardContent>
          <Typography variant="h5" sx={titleStyles}>
            Task Completion Rate: {completionRate}%
          </Typography>
          <Box sx={chartStyles}>
            <VictoryPie data={completionRateData} />
          </Box>
        </CardContent>
      </Card>

      <Card sx={cardStyles}>
        <CardContent>
          <Typography variant="h5" sx={titleStyles}>
            Average Task Duration: {avgTaskDuration} ms
          </Typography>
          <Box sx={chartStyles}>
            <VictoryChart>
              <VictoryAxis
                dependentAxis
                label="Duration (ms)"
                style={{ axisLabel: { padding: 30 } }}
              />
              <VictoryBar data={taskDurationData} />
            </VictoryChart>
          </Box>
        </CardContent>
      </Card>

      <Card sx={cardStyles}>
        <CardContent>
          <Typography variant="h5" sx={titleStyles}>
            Task Count by User
          </Typography>
          <Box sx={chartStyles}>
            <VictoryChart>
              <VictoryAxis
                label="User"
                style={{ axisLabel: { padding: 30 } }}
              />
              <VictoryAxis dependentAxis label="Task Count" />
              <VictoryBar data={taskCountData} />
            </VictoryChart>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;
