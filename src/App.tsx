import { Route, Switch } from "wouter"
import TeoriaScreen from "./screens/teoria"
import PracticaScreen from "./screens/practica";
import IndexScreen from "./screens";
import { Navbar } from "./components/NavBar";
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "./components/Footer";

export default function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="bg-background">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
          <Navbar />
          <Switch>
            <Route path="/gauss-seidel" component={IndexScreen} />
            <Route path="/gauss-seidel/teoria" component={TeoriaScreen} />
            <Route path="/gauss-seidel/practica" component={PracticaScreen} />

            <Route>404: No such page!</Route>
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}