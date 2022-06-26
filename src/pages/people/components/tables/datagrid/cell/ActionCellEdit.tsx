import { GridActionsCellItem } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import { useState } from 'react';
import EditPersonDialog from 'pages/people/components/dialogs/EditPersonDialog';
import { EDIT_DIALOG_TITLE } from 'pages/people/peopleConstants';
import { IPerson } from 'types/peopleTypes';

interface IActionCellEditProps {
  defaultValues: IPerson;
}

const ActionCellEdit = ({
  defaultValues,
}: IActionCellEditProps): JSX.Element => {
  const [EditPersonOpen, setEditPersonOpen] = useState(false);

  const handleEditPersonOpen = (): void => {
    setEditPersonOpen(true);
  };

  const handleEditPersonClose = (): void => {
    setEditPersonOpen(false);
  };

  return (
    <>
      <GridActionsCellItem
        icon={<Edit />}
        label="Edit"
        onClick={handleEditPersonOpen}
      />
      <EditPersonDialog
        open={EditPersonOpen}
        title={EDIT_DIALOG_TITLE}
        defaultValues={defaultValues}
        handleClose={handleEditPersonClose}
      />
    </>
  );
};

export default ActionCellEdit;
