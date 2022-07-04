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
} from './peopleConstants';
import CustomDatagrid from 'components/tables/datagrid/DataGrid';
import { IPeopleData, IPerson, IPersonCreationFields } from 'types/peopleTypes';
import { GET_USERS } from 'graphql/peopleQueries';
import {
  CREATE_USER,
  DELETE_USER,
  DELETE_USERS,
  UPDATE_USER,
} from './peopleQueries';
import EditPersonForm from './components/forms/EditPersonForm';
import AddPersonForm from './components/forms/AddPersonForm';

const People = () => {
  const { loading, data, refetch } = useQuery<IPeopleData>(GET_USERS);

  let rows: IPerson[] = [];

  if (!loading && data) {
    rows = data.users;
  }

  return (
    <CustomDatagrid<IPerson, IPersonCreationFields, IPerson, IPeopleData>
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
        EditItemForm: EditPersonForm,
        mutation: UPDATE_USER,
      }}
      addItemDialogProps={{
        title: ADD_DIALOG_TITLE,
        AddItemForm: AddPersonForm,
        mutation: CREATE_USER,
      }}
      refetchFunction={refetch}
    />
  );
};

export default People;
