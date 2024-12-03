import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

export default function WebsiteThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1e2a38",
      paper: "#28323c",
    },
    primary: {
      main: "#536dfe",
    },
    secondary: {
      main: "#ff4081",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cfd8dc",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
        containedPrimary: {
          background: "linear-gradient(90deg, #536dfe 0%, #82b1ff 100%)",
          color: "#ffffff",
          "&:hover": {
            background: "linear-gradient(90deg, #3d56d5 0%, #5d9eff 100%)",
          },
        },
      },
    },
  },
});
