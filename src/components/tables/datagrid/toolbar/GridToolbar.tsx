import { Box, Typography } from '@mui/material';
import {
  GridToolbarContainer,
  GridRowId,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import DeleteButton from 'components/buttons/DeleteButton';
import { useState } from 'react';

interface IDeleteMultipleDialogProps {
  open: boolean;
  ids: GridRowId[];
  handleClose: () => void;
  handleConfirm?: () => void;
}

interface IGridToolbarProps {
  label: string;
  toolbarComponent: React.ReactNode;
  buttonDeleteMultipleVisible: boolean;
  gridRowIds: GridRowId[];
  DialogDeleteMultiple: React.FC<IDeleteMultipleDialogProps>;
}

const GridToolbar = ({
  label,
  toolbarComponent,
  buttonDeleteMultipleVisible,
  gridRowIds,
  DialogDeleteMultiple,
}: IGridToolbarProps): JSX.Element => {
  const [deleteMultipleDialogOpen, setDeleteMultipleDialognOpen] =
    useState(false);

  const handleMultipleDeleteDialogOpen = (): void => {
    setDeleteMultipleDialognOpen(true);
  };

  const handleMultipleDeleteDialogClose = (): void => {
    setDeleteMultipleDialognOpen(false);
  };

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
            onClick={handleMultipleDeleteDialogOpen}
          />
          <DialogDeleteMultiple
            open={deleteMultipleDialogOpen}
            handleClose={handleMultipleDeleteDialogClose}
            ids={gridRowIds}
          />
        </Box>
        {toolbarComponent}
      </Box>
    </GridToolbarContainer>
  );
};

export default GridToolbar;
