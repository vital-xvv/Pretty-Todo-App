import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Layout from "./components/Layout";
import {createTheme, ThemeProvider} from "@mui/material";
import {lightGreen, pink} from "@mui/material/colors";
import Edit from "./pages/Edit";
import Counter from "./pages/Counter";

const theme = createTheme({
  palette: {
    primary: pink,
    secondary: lightGreen
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Notes />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/edit">
                <Edit />
              </Route>
              <Route path="/counter">
                <Counter />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
  );
}

export default App;
