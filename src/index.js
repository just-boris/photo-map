import { h, render } from "preact";
import Router from "preact-router";
import { createHashHistory } from "history";
import IndexPage from "./pages/index";
import MapPage from "./pages/map";
import "./index.css";

render(
  <Router history={createHashHistory()}>
    <IndexPage path="/" />
    <MapPage path="/map" />
  </Router>,
  document.getElementById("root")
);
