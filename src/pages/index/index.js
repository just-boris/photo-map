import { h, Component } from "preact";
import { route } from "preact-router";
import api from "../../api";

export default class App extends Component {
  state = {};

  onSignClick = () => {
    window.open(api.auth());
  };

  componentDidMount() {
    if (api.getToken()) {
      route("/map");
    }
  }

  render() {
    if (!api.getToken()) {
      return <button onClick={this.onSignClick}>Sign in to Instagram</button>;
    }
    return (
      <div>
        <a href="#/map">My photo map</a>
      </div>
    );
  }
}
