import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { MAIN_TABLE_LABEL, ADD_DIALOG_TITLE, COLUMNS } from './homeConstants';
import { GET_TASKS } from './homeQueries';
import CustomDatagrid from 'components/tables/datagrid/DataGrid';
import AddTaskDialog from './components/dialogs/AddTaskDialog';
import AddButton from 'components/buttons/AddButton';
import { ITask, ITaskRows } from 'pages/home/homeTypes';
import DeleteTasksDialog from './components/dialogs/DeleteTasksDialog';

interface ITasksData {
  tasks: ITask[];
}

const Home = () => {
  const [AddTaskOpen, setAddTaskOpen] = useState(false);
  const { loading, data } = useQuery<ITasksData>(GET_TASKS);

  const handleAddTaskOpen = (): void => {
    setAddTaskOpen(true);
  };

  const handleAddTaskClose = (): void => {
    setAddTaskOpen(false);
  };

  let rows: ITaskRows[] = [];

  if (!loading && data) {
    rows = data.tasks.map(({ id, taskName, user: { name }, dueDate }) => ({
      id,
      taskName,
      person: name,
      dueDate,
    }));
  }

  return (
    <>
      <CustomDatagrid<ITaskRows>
        loading={loading}
        rows={rows}
        columns={COLUMNS}
        label={MAIN_TABLE_LABEL}
        toolbarComponent={<AddButton onClick={handleAddTaskOpen} />}
        DialogDeleteMultiple={DeleteTasksDialog}
      />
      <AddTaskDialog
        open={AddTaskOpen}
        title={ADD_DIALOG_TITLE}
        handleClose={handleAddTaskClose}
      />
    </>
  );
};

export default Home;
