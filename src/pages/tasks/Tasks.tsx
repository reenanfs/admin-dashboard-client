import { useQuery } from '@apollo/client';

import CustomDatagrid from 'components/tables/datagrid/DataGrid';
import EditTaskForm from './components/forms/EditTaskForm';

import AddTaskForm from './components/forms/AddTaskForm';
import {
  CREATE_TASK,
  DELETE_TASK,
  DELETE_TASKS,
  GET_TASKS_PAGE_DATA,
  UPDATE_TASK,
} from './tasksQueries';
import {
  ADD_DIALOG_TITLE,
  COLUMNS,
  DELETE_DIALOG_CONTENT,
  DELETE_DIALOG_TITLE,
  DELETE_MULTIPLE_DIALOG_CONTENT,
  DELETE_MULTIPLE_DIALOG_TITLE,
  EDIT_DIALOG_TITLE,
  MAIN_TABLE_LABEL,
} from './tasksConstants';

import { useCurrentUser } from 'hooks/useCurrentUser';
import {
  ITask,
  ITaskCreationInput,
  ITaskRows,
  ITasksPageData,
} from './tasksTypes';

const Home = (): JSX.Element => {
  const { currentUser } = useCurrentUser();

  const { loading, data, refetch } = useQuery<ITasksPageData>(
    GET_TASKS_PAGE_DATA,
    {
      variables: {
        input: {
          id: currentUser?.currentProjectId,
        },
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  let rows: ITaskRows[] = [];
  if (!loading && data) {
    const tasks = data.project.tasks;

    rows = tasks.map(task => ({
      ...task,
      person: task.user && task.user.name,
    }));
  }

  return (
    <CustomDatagrid<ITask, ITaskCreationInput, ITaskRows, ITasksPageData>
      loading={loading}
      rows={rows}
      columns={COLUMNS}
      label={MAIN_TABLE_LABEL}
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
      editItemDialogProps={{
        title: EDIT_DIALOG_TITLE,
        EditItemForm: EditTaskForm,
        mutation: UPDATE_TASK,
      }}
      addItemDialogProps={{
        title: ADD_DIALOG_TITLE,
        AddItemForm: AddTaskForm,
        mutation: CREATE_TASK,
      }}
      refetchFunction={refetch}
    />
  );
};

export default Home;
