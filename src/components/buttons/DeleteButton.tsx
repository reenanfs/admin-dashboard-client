import Button, { ButtonProps } from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { SxProps } from '@mui/material';

interface IDeleteButton extends ButtonProps {
  onClick?: () => void;

  sx: SxProps;
}

const DeleteButton = ({ id, onClick, sx }: IDeleteButton): JSX.Element => {
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon sx={{ color: 'error.main' }} />}
      onClick={onClick}
      id={id}
      color="error"
      sx={sx}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
