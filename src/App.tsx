import { Route, Switch } from "wouter"
import TeoriaScreen from "./screens/teoria"
import PracticaScreen from "./screens/practica";
import IndexScreen from "./screens";
import { Navbar } from "./components/NavBar";

export default function App() {

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/gauss-seidel" component={IndexScreen} />
        <Route path="/gauss-seidel/teoria" component={TeoriaScreen} />
        <Route path="/gauss-seidel/practica" component={PracticaScreen} />

        {/* Default route in a switch */}
        <Route>404: No such page!</Route>
      </Switch>
    </>
  );
}
