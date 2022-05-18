import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { useState } from 'react';

import { MAIN_TABLE_LABEL, ADD_DIALOG_TITLE, COLUMNS } from './peopleConstants';
import { PeopleGridRowDef } from './peopleTypes';
import { GET_USERS } from './peopleQueries';
import CustomDatagrid from 'components/tables/datagrid/DataGrid';
import AddPersonDialog from './components/dialogs/AddPersonDialog';
import AddButton from 'components/buttons/AddButton';
import { Person } from 'pages/people/peopleTypes';

interface IPeopleData {
  users: Person[];
}

const People = () => {
  const [AddPersonOpen, setAddPersonOpen] = useState(false);
  const { loading, data } = useQuery<IPeopleData>(GET_USERS);

  const handleAddPersonOpen = (): void => {
    setAddPersonOpen(true);
  };

  const handleAddPersonClose = (): void => {
    setAddPersonOpen(false);
  };

  let rows: PeopleGridRowDef[] = [];

  if (!loading && data) {
    rows = data.users;
  }

  return (
    <>
      <CustomDatagrid<PeopleGridRowDef>
        loading={loading}
        rows={rows}
        columns={COLUMNS}
        label={MAIN_TABLE_LABEL}
        toolbarComponent={
          <Box sx={{ mr: 2 }}>
            <AddButton onClick={handleAddPersonOpen} />
          </Box>
        }
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
