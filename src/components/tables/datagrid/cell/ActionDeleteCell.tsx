import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import { useDialogs } from 'hooks/useDialogs';

interface ActionCellDeleteProps {
  id: GridRowId;
}

const ActionDeleteCell = ({ id }: ActionCellDeleteProps): JSX.Element => {
  const {
    deleteItemDialog: { handleOpen, setId },
  } = useDialogs();

  return (
    <GridActionsCellItem
      icon={<Delete />}
      label="Delete"
      onClick={() => {
        handleOpen();
        setId(id);
      }}
    />
  );
};

export default ActionDeleteCell;
