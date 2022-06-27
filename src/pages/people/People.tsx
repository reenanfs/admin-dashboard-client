import { useQuery } from '@apollo/client';
import { useState } from 'react';

import {
  MAIN_TABLE_LABEL,
  ADD_DIALOG_TITLE,
  COLUMNS,
  DELETE_MULTIPLE_DIALOG_TITLE,
  DELETE_MULTIPLE_DIALOG_CONTENT,
  DELETE_DIALOG_TITLE,
  DELETE_DIALOG_CONTENT,
  EDIT_DIALOG_TITLE,
} from './peopleConstants';

import CustomDatagrid from 'components/tables/datagrid/DataGrid';
import AddPersonDialog from './components/dialogs/AddPersonDialog';
import AddButton from 'components/buttons/AddButton';

import { IPeopleData, IPerson } from 'types/peopleTypes';
import { GET_USERS } from 'graphql/peopleQueries';
import { DELETE_USER, DELETE_USERS, UPDATE_USER } from './peopleQueries';
import EditPersonForm from './components/forms/EditPersonForm';

const People = () => {
  const [AddPersonOpen, setAddPersonOpen] = useState(false);
  const { loading, data } = useQuery<IPeopleData>(GET_USERS);

  const handleAddPersonOpen = (): void => {
    setAddPersonOpen(true);
  };

  const handleAddPersonClose = (): void => {
    setAddPersonOpen(false);
  };

  let rows: IPerson[] = [];

  if (!loading && data) {
    rows = data.users;
  }

  return (
    <>
      <CustomDatagrid<IPerson, IPerson>
        loading={loading}
        rows={rows}
        columns={COLUMNS}
        label={MAIN_TABLE_LABEL}
        toolbarComponent={<AddButton onClick={handleAddPersonOpen} />}
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
          Form: EditPersonForm,
          mutation: UPDATE_USER,
        }}
        dialogRefetchProps={{
          refetchQuery: GET_USERS,
          refetchQueryName: 'GetUsers',
        }}
      />
      <AddPersonDialog
        open={AddPersonOpen}
        title={ADD_DIALOG_TITLE}
        handleClose={handleAddPersonClose}
      />
    </>
  );
};

export default People;
