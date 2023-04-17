import { Paper, PaperProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)({
  backgroundColor: '#d4edda',
  color: '#155724',
  padding: '10px',
  border: '1px solid #c3e6cb',
  width: '100%',
  mb: 2,
  textAlign: 'center',
});

interface SuccessPaperProps {
  successMessage: string;
}

export const SuccessPaper = (
  { successMessage }: SuccessPaperProps,
  props: PaperProps
) => {
  return <StyledPaper {...props}>{successMessage}</StyledPaper>;
};

export default SuccessPaper;
