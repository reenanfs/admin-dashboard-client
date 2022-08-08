import Button, { ButtonProps } from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

interface IEditButton extends ButtonProps {
  onClick?: () => void;
}

const EditButton = ({ id, onClick }: IEditButton): JSX.Element => {
  return (
    <Button
      variant="outlined"
      startIcon={<EditIcon />}
      onClick={onClick}
      id={id}
    >
      Edit
    </Button>
  );
};

export default EditButton;
