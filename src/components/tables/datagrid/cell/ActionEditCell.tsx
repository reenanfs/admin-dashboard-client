import { GridActionsCellItem } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import { useDialogs } from 'hooks/useDialogs';
import { ValidAppEntities } from 'types/appTypes';

interface IActionCellEditProps<T> {
  defaultValues: T;
}

const ActionEditCell = <T extends ValidAppEntities>({
  defaultValues,
}: IActionCellEditProps<T>): JSX.Element => {
  const {
    editItemDialog: { handleOpen, setDefaultValues },
  } = useDialogs();

  return (
    <>
      <GridActionsCellItem
        icon={<Edit />}
        label="Edit"
        onClick={() => {
          setDefaultValues(defaultValues);
          handleOpen();
        }}
      />
    </>
  );
};

export default ActionEditCell;
