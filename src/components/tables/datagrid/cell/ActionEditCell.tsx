import { GridActionsCellItem } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import { useDialogs } from 'hooks/useDialogs';
import { ValidDataGridEntitiesUpdateInput } from 'types/dataGridTypes';

interface IActionCellEditProps<T> {
  defaultValues: T;
}

const ActionEditCell = <T extends ValidDataGridEntitiesUpdateInput>({
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
