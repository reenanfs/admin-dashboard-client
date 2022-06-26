import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import { useState } from 'react';
import DeleteTaskDialog from 'pages/home/components/dialogs/DeleteTaskDialog';
import { DELETE_DIALOG_TITLE } from 'pages/home/homeConstants';

interface ActionCellDeleteProps {
  id: GridRowId;
}

const ActionCellDelete = ({ id }: ActionCellDeleteProps): JSX.Element => {
  const [DeletePersonOpen, setDeletePersonOpen] = useState(false);

  const handleDeletePersonOpen = (): void => {
    setDeletePersonOpen(true);
  };

  const handleDeletePersonClose = (): void => {
    setDeletePersonOpen(false);
  };

  return (
    <>
      <GridActionsCellItem
        icon={<Delete />}
        label="Delete"
        onClick={handleDeletePersonOpen}
      />
      <DeleteTaskDialog
        open={DeletePersonOpen}
        title={DELETE_DIALOG_TITLE}
        handleClose={handleDeletePersonClose}
        id={id}
      />
    </>
  );
};

export default ActionCellDelete;
