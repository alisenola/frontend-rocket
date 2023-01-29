import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import { store } from "store";
import { SnackbarProvider } from "notistack";

const theme = createTheme({ palette: { primary: { main: "#3366d6" } } });

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
              <Layout />
            </SnackbarProvider>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
