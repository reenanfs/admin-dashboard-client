import { GridActionsCellItem } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import { useState } from 'react';
// import EditTaskDialog from 'pages/home/components/dialogs/EditTaskDialog';
import { EDIT_DIALOG_TITLE } from 'pages/home/homeConstants';
import { ITask } from 'pages/home/homeTypes';

interface IActionCellEditProps {
  defaultValues: ITask;
}

const ActionCellEdit = ({
  defaultValues,
}: IActionCellEditProps): JSX.Element => {
  const [EditTaskOpen, setEditTaskOpen] = useState(false);

  const handleEditTaskOpen = (): void => {
    setEditTaskOpen(true);
  };

  const handleEditTaskClose = (): void => {
    setEditTaskOpen(false);
  };

  return (
    <>
      <GridActionsCellItem
        icon={<Edit />}
        label="Edit"
        onClick={handleEditTaskOpen}
      />
      {/* <EditTaskDialog
        open={EditTaskOpen}
        title={EDIT_DIALOG_TITLE}
        defaultValues={defaultValues}
        handleClose={handleEditTaskClose}
      /> */}
    </>
  );
};

export default ActionCellEdit;
