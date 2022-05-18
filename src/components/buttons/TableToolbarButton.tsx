import { Button } from '@mui/material';

interface ITableToolbarButton {
  text: string;
  onClick?: () => void;
}

export const TableToolbarButton = ({
  text,
  onClick,
}: ITableToolbarButton): JSX.Element => {
  return (
    <Button
      variant="contained"
      sx={{
        ml: { sm: 2 },
        mr: { xs: 1, sm: 1 },
        mb: { sm: 2 },
        mt: { sm: 2 },
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
