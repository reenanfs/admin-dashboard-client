import { Typography } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';

interface IGridToolbarProps {
  label: string;
}

const GridToolbar = ({ label }: IGridToolbarProps) => {
  return (
    <GridToolbarContainer>
      <Typography
        variant="h6"
        component="div"
        sx={{
          flex: '1 1 100%',
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          pb: { sm: 2 },
          pt: { sm: 2 },
        }}
      >
        {label}
      </Typography>
    </GridToolbarContainer>
  );
};

export default GridToolbar;
