import { Paper, PaperProps } from '@mui/material';
import Draggable from 'react-draggable';

export const DraggablePaper = (props: PaperProps) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};
