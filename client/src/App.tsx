import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { THEME } from "constants/theme";
import ApplicationForm from "views/ApplicationForm";

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <ApplicationForm />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
