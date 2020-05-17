import React from "react";
import "./styles.css";
import Login from './components/Login'
import CriarLogin from './components/CriarLogin'
import TelaInicio from './components/TelaInicio'
import Grid from '@material-ui/core/Grid';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserAuth from './state/auth/Provider'

export default function App() {
  return (
    <UserAuth>
      <Router>
        <div className="App">
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Switch>
                <Route path="/" exact={true} component={Login} />
                <Route path="/new" component={CriarLogin} />
                <Route path="/inicio" component={TelaInicio} />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </Router>
    </UserAuth>
  );
}
