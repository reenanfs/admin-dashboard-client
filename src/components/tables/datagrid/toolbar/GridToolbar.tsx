import { Box, Typography } from '@mui/material';
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import DeleteButton from 'components/buttons/DeleteButton';
import { useDialogs } from 'hooks/useDialogs';

interface IGridToolbarProps {
  label: string;
  toolbarComponent: React.ReactNode;
  buttonDeleteMultipleVisible: boolean;
}

const GridToolbar = ({
  label,
  toolbarComponent,
  buttonDeleteMultipleVisible,
}: IGridToolbarProps): JSX.Element => {
  const {
    deleteMultipleItemsDialog: {
      handleOpen: handleDeleteMultipleItemsDialogOpen,
    },
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
      <GridToolbarQuickFilter sx={{ mr: 10 }} />
      <Box sx={{ mr: 2 }}>
        <Box
          component="span"
          sx={{
            visibility: buttonDeleteMultipleVisible ? 'visible' : 'hidden',
          }}
        >
          <DeleteButton
            sx={{ mr: 1 }}
            onClick={handleDeleteMultipleItemsDialogOpen}
          />
        </Box>
        {toolbarComponent}
      </Box>
    </GridToolbarContainer>
  );
};

export default GridToolbar;
