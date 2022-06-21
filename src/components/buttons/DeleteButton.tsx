import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { SxProps } from '@mui/material';

interface IDeleteButton {
  onClick?: () => void;
  sx: SxProps;
}

const DeleteButton = ({ onClick, sx }: IDeleteButton): JSX.Element => {
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon sx={{ color: 'error.main' }} />}
      onClick={onClick}
      color="error"
      sx={sx}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
