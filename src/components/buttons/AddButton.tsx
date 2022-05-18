import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface IAddButton {
  onClick?: () => void;
}

const AddButton = ({ onClick }: IAddButton): JSX.Element => {
  return (
    <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={onClick}>
      Add
    </Button>
  );
};

export default AddButton;
