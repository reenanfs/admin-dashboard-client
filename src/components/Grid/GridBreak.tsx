import { Grid, SxProps, Theme } from '@mui/material';

interface IGridBreakProps {
  sx: SxProps<Theme>;
}
const GridBreak = ({ sx }: IGridBreakProps): JSX.Element => {
  return <Grid sx={sx} width="100%" />;
};

export default GridBreak;
