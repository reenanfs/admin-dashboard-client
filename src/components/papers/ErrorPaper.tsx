import { Paper, PaperProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)({
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '10px',
  border: '1px solid #f5c6cb',
  width: '100%',
  mb: 2,
  textAlign: 'center',
});

interface ErrorPaperProps {
  errorMessage: string;
}

export const ErrorPaper = (
  { errorMessage }: ErrorPaperProps,
  props: PaperProps
) => {
  return <StyledPaper {...props}>{errorMessage}</StyledPaper>;
};

export default ErrorPaper;
