import Button from '@mui/material/Button';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { ButtonProps } from '@mui/material';

interface IMarkCompletedButton extends ButtonProps {
  onClick?: () => void;
}

const MarkCompletedButton = ({
  id,
  onClick,
}: IMarkCompletedButton): JSX.Element => {
  return (
    <Button
      variant="outlined"
      color="success"
      sx={{
        borderRadius: 10,
        width: 250,
      }}
      startIcon={<DoneOutlineIcon color="success" />}
      onClick={onClick}
      id={id}
    >
      Mark as Completed
    </Button>
  );
};

export default MarkCompletedButton;
