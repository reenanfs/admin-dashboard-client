import Button, { ButtonProps } from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface IGenericContainedAddButton extends ButtonProps {
  onClick?: () => void;
  text: string;
}

const GenericContainedAddButton = ({
  onClick,
  text,
  id,
}: IGenericContainedAddButton): JSX.Element => {
  return (
    <Button
      variant="contained"
      startIcon={<AddCircleIcon />}
      onClick={onClick}
      id={id}
    >
      {text}
    </Button>
  );
};

export default GenericContainedAddButton;
