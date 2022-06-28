import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import Sign from "./screens/sign";
import Home from "./screens/home";
import crearPresupuesto from "./screens/crearPresupuesto";
import editarPresupuesto from "./screens/editarPresupuesto";
import PresupuestosAnteriores from "./screens/presupuestosAnteriores";
import Profile from "./screens/profile";

function App(){
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Sign} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/crearPresupuesto" component={crearPresupuesto} />
        <Route exact path="/editarPresupuesto" component={editarPresupuesto} />
        <Route exact path="/presupuestosAnteriores" component={PresupuestosAnteriores} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;