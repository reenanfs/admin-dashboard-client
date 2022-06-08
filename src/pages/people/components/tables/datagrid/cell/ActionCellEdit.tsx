import { GridActionsCellItem } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';

const ActionCellEdit = (): JSX.Element => {
  return (
    <GridActionsCellItem
      icon={<Edit />}
      label="Edit"
      onClick={params => console.log(params)}
    />
  );
};

export default ActionCellEdit;
