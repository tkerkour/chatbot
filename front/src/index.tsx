import { render } from "@solidjs/web";
import { Router, paths } from "./router";
import "./index.css";

render(
  () => (
    <Router>
      {(props) => (
        <>
          <nav>
            <a href={paths()}>Accueil</a>
            <a href={paths.about}>À propos</a>
          </nav>
          <main>{props.children}</main>
        </>
      )}
    </Router>
  ),
  document.getElementById("root")!,
);
