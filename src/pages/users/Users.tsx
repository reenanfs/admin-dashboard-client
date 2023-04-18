import { useQuery } from '@apollo/client';

import {
  MAIN_TABLE_LABEL,
  COLUMNS,
  DELETE_MULTIPLE_DIALOG_TITLE,
  DELETE_MULTIPLE_DIALOG_CONTENT,
  DELETE_DIALOG_TITLE,
  DELETE_DIALOG_CONTENT,
  EDIT_DIALOG_TITLE,
  ADD_DIALOG_TITLE,
} from './usersConstants';
import CustomDatagrid from 'components/tables/datagrid/DataGrid';

import {
  CREATE_USER_TO_PROJECT,
  DELETE_USER,
  DELETE_USERS,
  GET_USERS_PAGE_DATA,
  UPDATE_USER_IN_PROJECT,
} from './usersQueries';
import EditUserForm from './components/forms/EditUserForm';
import AddUserForm from './components/forms/AddUserForm';
import { useCurrentUser } from 'hooks/useCurrentUser';
import {
  IUserToProjectCreationInput,
  IUserRows,
  IUsersPageData,
  IUserToProjectUpdateInput,
} from './usersTypes';

const Users = (): JSX.Element => {
  const { currentUser } = useCurrentUser();
  const { loading, data, refetch } = useQuery<IUsersPageData>(
    GET_USERS_PAGE_DATA,
    {
      variables: {
        input: {
          id: currentUser?.currentProjectId,
        },
      },
    }
  );

  let rows: IUserRows[] = [];

  if (!loading && data) {
    const {
      project: { projectMemberships, owner },
    } = data;
    rows = [
      ...projectMemberships.map(({ user, role }) => ({
        id: user.id,
        name: user.name,
        role: role.name,
        roleId: role.id,
        email: user.credential ? user.credential.email : '',
      })),
      {
        id: owner.id,
        name: owner.name,
        role: 'Project Owner',
        roleId: '',
        email: owner.credential.email,
      },
    ];
  }

  return (
    <CustomDatagrid<
      IUserToProjectUpdateInput,
      IUserToProjectCreationInput,
      IUserRows,
      IUsersPageData
    >
      loading={loading}
      rows={rows}
      columns={COLUMNS}
      label={MAIN_TABLE_LABEL}
      deleteMultipleItemsDialogProps={{
        title: DELETE_MULTIPLE_DIALOG_TITLE,
        content: DELETE_MULTIPLE_DIALOG_CONTENT,
        mutation: DELETE_USERS,
      }}
      deleteItemDialogProps={{
        title: DELETE_DIALOG_TITLE,
        content: DELETE_DIALOG_CONTENT,
        mutation: DELETE_USER,
      }}
      editItemDialogProps={{
        title: EDIT_DIALOG_TITLE,
        EditItemForm: EditUserForm,
        mutation: UPDATE_USER_IN_PROJECT,
      }}
      addItemDialogProps={{
        title: ADD_DIALOG_TITLE,
        AddItemForm: AddUserForm,
        mutation: CREATE_USER_TO_PROJECT,
      }}
      refetchFunction={refetch}
    />
  );
};

export default Users;
