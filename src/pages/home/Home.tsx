import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import {
  MAIN_TABLE_LABEL,
  ADD_DIALOG_TITLE,
  COLUMNS,
  DELETE_MULTIPLE_DIALOG_TITLE,
  DELETE_MULTIPLE_DIALOG_CONTENT,
  DELETE_DIALOG_TITLE,
  DELETE_DIALOG_CONTENT,
} from './homeConstants';
import { DELETE_TASK, DELETE_TASKS, GET_TASKS } from './homeQueries';
import CustomDatagrid from 'components/tables/datagrid/DataGrid';
import AddTaskDialog from './components/dialogs/AddTaskDialog';
import AddButton from 'components/buttons/AddButton';
import { ITask, ITaskRows } from 'pages/home/homeTypes';
import EditPersonForm from 'pages/people/components/forms/EditPersonForm';
import EditTaskForm from './components/forms/EditTaskForm';

interface ITasksData {
  tasks: ITask[];
}

const Home = () => {
  const [addTaskOpen, setAddTaskOpen] = useState(false);
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
      <CustomDatagrid<ITask, ITaskRows>
        loading={loading}
        rows={rows}
        columns={COLUMNS}
        label={MAIN_TABLE_LABEL}
        toolbarComponent={<AddButton onClick={handleAddTaskOpen} />}
        deleteMultipleItemsDialogProps={{
          title: DELETE_MULTIPLE_DIALOG_TITLE,
          content: DELETE_MULTIPLE_DIALOG_CONTENT,
          mutation: DELETE_TASKS,
        }}
        deleteItemDialogProps={{
          title: DELETE_DIALOG_TITLE,
          content: DELETE_DIALOG_CONTENT,
          mutation: DELETE_TASK,
        }}
        dialogRefetchProps={{
          refetchQuery: GET_TASKS,
          refetchQueryName: 'GetTasks',
        }}
        editItemDialogProps={{
          title: DELETE_DIALOG_TITLE,
          Form: EditTaskForm,
          mutation: DELETE_TASK,
        }}
      />
      <AddTaskDialog
        open={addTaskOpen}
        title={ADD_DIALOG_TITLE}
        handleClose={handleAddTaskClose}
      />
    </>
  );
};

export default Home;
