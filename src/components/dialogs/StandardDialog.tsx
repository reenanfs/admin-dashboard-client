import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { DraggablePaper } from 'components/papers/DraggablePaper';

interface IStandardDialogProps {
  open: boolean;
  title: string;
  content: JSX.Element;
  contentFormId?: string;
  confirmButtonLoading: boolean;
  handleClose: () => void;
  handleConfirm?: () => void;
}

const StandardDialog = ({
  open,
  title,
  content,
  contentFormId,
  confirmButtonLoading,
  handleClose,
  handleConfirm,
}: IStandardDialogProps): JSX.Element => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={DraggablePaper}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle
        style={{ cursor: 'move' }}
        id="draggable-dialog-title"
        color="primary"
        sx={{ backgroundColor: 'primary.main', color: 'white' }}
      >
        <Typography component="div">
          <Box sx={{ fontWeight: 'bold' }}>{title}</Box>
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Typography component="div">{content}</Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <LoadingButton
          onClick={handleConfirm}
          type="submit"
          form={contentFormId}
          loading={confirmButtonLoading}
        >
          Confirm
        </LoadingButton>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StandardDialog;
