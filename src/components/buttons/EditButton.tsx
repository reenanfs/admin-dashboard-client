import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

interface IEditButton {
  onClick?: () => void;
}

const EditButton = ({ onClick }: IEditButton): JSX.Element => {
  return (
    <Button variant="outlined" startIcon={<EditIcon />} onClick={onClick}>
      Edit
    </Button>
  );
};

export default EditButton;
