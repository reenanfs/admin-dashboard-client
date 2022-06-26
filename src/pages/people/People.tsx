import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { MAIN_TABLE_LABEL, ADD_DIALOG_TITLE, COLUMNS } from './peopleConstants';

import CustomDatagrid from 'components/tables/datagrid/DataGrid';
import AddPersonDialog from './components/dialogs/AddPersonDialog';
import AddButton from 'components/buttons/AddButton';

import DeletePeopleDialog from './components/dialogs/DeletePeopleDialog';
import { IPeopleData, IPerson } from 'types/peopleTypes';
import { GET_USERS } from 'graphql/peopleQueries';

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
      <CustomDatagrid<IPerson>
        loading={loading}
        rows={rows}
        columns={COLUMNS}
        label={MAIN_TABLE_LABEL}
        toolbarComponent={<AddButton onClick={handleAddPersonOpen} />}
        DialogDeleteMultiple={DeletePeopleDialog}
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
