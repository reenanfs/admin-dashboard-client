import Button, { ButtonProps } from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface IAddButton extends ButtonProps {
  onClick?: () => void;
}

const AddButton = ({ onClick, id }: IAddButton): JSX.Element => {
  return (
    <Button
      variant="outlined"
      startIcon={<AddCircleIcon />}
      onClick={onClick}
      id={id}
    >
      Add
    </Button>
  );
};

export default AddButton;
