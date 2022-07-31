import { Box, Typography } from '@mui/material';
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import AddButton from 'components/buttons/AddButton';
import DeleteButton from 'components/buttons/DeleteButton';
import { useDialogs } from 'hooks/useDialogs';

interface IGridToolbarProps {
  label: string;
  buttonDeleteMultipleVisible: boolean;
}

const GridToolbar = ({
  label,
  buttonDeleteMultipleVisible,
}: IGridToolbarProps): JSX.Element => {
  const {
    deleteMultipleItemsDialog: {
      handleOpen: handleDeleteMultipleItemsDialogOpen,
    },
    addItemDialog: { handleOpen: handleAddItemOpen },
  } = useDialogs();

  return (
    <GridToolbarContainer>
      <Typography
        variant="h6"
        component="div"
        sx={{
          flex: '1 1 50%',
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          pb: { sm: 2 },
          pt: { sm: 2 },
        }}
      >
        {label}
      </Typography>
      <GridToolbarQuickFilter sx={{ mr: 10 }} color="primary" />
      <Box sx={{ mr: 2 }}>
        <DeleteButton
          sx={{
            mr: 1,
            visibility: buttonDeleteMultipleVisible ? 'visible' : 'hidden',
          }}
          onClick={handleDeleteMultipleItemsDialogOpen}
        />
        <AddButton onClick={handleAddItemOpen} />
      </Box>
    </GridToolbarContainer>
  );
};

export default GridToolbar;
