import { gql, useQuery } from '@apollo/client';
import { format } from 'date-fns';

import CustomDatagrid from 'components/tables/datagrid/DataGrid';
import { HomeGridRowDef, label, columns } from './homeConfiguration';

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      taskName
      description
      startDate
      user {
        email
      }
      dueDate
    }
  }
`;

interface Task {
  id: string;
  taskName: string;
  description: string;
  startDate: string;
  user: {
    email: string;
  };
  dueDate: string;
}

interface TaskData {
  tasks: Task[];
}

const Home = (): JSX.Element => {
  const { loading, data } = useQuery<TaskData>(GET_TASKS);

  let rows: HomeGridRowDef[] = [];

  if (!loading && data) {
    rows = data!.tasks.map(task => {
      let { user, ...taskProps } = task;

      let row: HomeGridRowDef = {
        ...taskProps,
        startDate: format(new Date(taskProps.startDate), 'dd/MM/yyyy'),
        dueDate: format(new Date(taskProps.startDate), 'dd/MM/yyyy'),
        person: user.email,
      };

      return row;
    });
  }

  return (
    <>
      <CustomDatagrid<HomeGridRowDef>
        loading={false}
        rows={rows}
        columns={columns}
        label={label}
      />
    </>
  );
};

export default Home;
