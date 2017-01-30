import { h, Component } from "preact";
import { route } from "preact-router";
import injectSheet from "react-jss";
import Button from "../../components/button";
import api from "../../api";

const privacyUrl = `http://${location.host}${location.pathname}privacy.html`;

const styles = {
  panel: {
    margin: [ "3em", "auto" ],
    maxWidth: 500,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 5,
    textAlign: "center"
  },
  content: { padding: [ "2em" ] },
  link: { color: "#19b1ff", textDecoration: "none" },
  image: { maxWidth: "100%", borderBottom: "1px solid #bbb" },
  message: { color: "#999", fontSize: 11 },
  title: { marginTop: 0, fontSize: 24, fontWeight: "normal" }
};

class App extends Component {
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
    const { sheet: { classes } } = this.props;
    if (!api.getToken()) {
      return (
        <div className={classes.panel}>
          <img
            className={classes.image}
            src={require("./welcome.png")}
            alt="Welcome"
          />
          <div className={classes.content}>
            <h1 className={classes.title}>
              Your photos from Instagram on the map
            </h1>
            <p className={classes.message}>
              To browse your photos, you need to sign in into your Instagram accoount.
            We will not save any of your personal data.
              {"  "}
              <a href={privacyUrl} className={classes.link}>
                Our full Privacy Policy
              </a>
            </p>
            <p className={classes.message}>
              Photo map is <a className={classes.link} href="https://github.com/just-boris/photo-map">Open Source project</a>.
            </p>
            <Button onClick={this.onSignClick}>Sign in to Instagram</Button>
          </div>
        </div>
      );
    }
    return (
      <div>
        You will be redirected to the map. If it is not happening, please, refresh the page
      </div>
    );
  }
}

export default injectSheet(styles)(App);
