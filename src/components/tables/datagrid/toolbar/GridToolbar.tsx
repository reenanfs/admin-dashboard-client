import { Box, Typography } from '@mui/material';
import {
  GridToolbarContainer,
  GridRowId,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import DeleteButton from 'components/buttons/DeleteButton';
import { MDELETE_DIALOG_TITLE } from 'pages/people/peopleConstants';
import { useState } from 'react';

interface IMDeleteDialogProps {
  open: boolean;
  title: string;
  ids: GridRowId[];
  handleClose: () => void;
  handleConfirm?: () => void;
}

interface IGridToolbarProps {
  label: string;
  toolbarComponent: JSX.Element;
  mDeleteButtonVisible: boolean;
  gridRowIds: GridRowId[];
  MDeleteDialog: React.ElementType<IMDeleteDialogProps>;
}

const GridToolbar = ({
  label,
  toolbarComponent,
  mDeleteButtonVisible,
  gridRowIds,
  MDeleteDialog,
}: IGridToolbarProps): JSX.Element => {
  const [mDeleteDialogOpen, setMDeleteDialognOpen] = useState(false);

  const handleMDeleteDialogOpen = (): void => {
    setMDeleteDialognOpen(true);
  };

  const handleMDeleteDialogClose = (): void => {
    setMDeleteDialognOpen(false);
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
          sx={{ visibility: mDeleteButtonVisible ? 'visible' : 'hidden' }}
        >
          <DeleteButton sx={{ mr: 1 }} onClick={handleMDeleteDialogOpen} />
          <MDeleteDialog
            open={mDeleteDialogOpen}
            title={MDELETE_DIALOG_TITLE}
            handleClose={handleMDeleteDialogClose}
            ids={gridRowIds}
          />
        </Box>
        {toolbarComponent}
      </Box>
    </GridToolbarContainer>
  );
};

export default GridToolbar;
