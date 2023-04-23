import { CssBaseline, ThemeProvider } from "@mui/material";
import { THEME } from "constants/theme";
import ApplicationForm from "views/ApplicationForm";

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <CssBaseline />
      <ApplicationForm />
    </ThemeProvider>
  );
}

export default App;
