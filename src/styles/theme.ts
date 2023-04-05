import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
        }),
      },
    },
    MuiLink: {
      defaultProps: {
        color: 'inherit',
        underline: 'none',
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&.Mui-disabled': {
            cursor: 'not-allowed',
          },
        },
        root: {
          '&.Mui-disabled': {
            cursor: 'not-allowed !important',
          },
        },
      },
    },
  },
});
