import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

interface IDeleteButton {
  onClick?: () => void;
}

const DeleteButton = ({ onClick }: IDeleteButton): JSX.Element => {
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon sx={{ color: 'error.main' }} />}
      onClick={onClick}
      color="error"
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
