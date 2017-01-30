import { h, Component } from "preact";
import PhotoMap from "../../components/photo-map";
import Button from "../../components/button";
import { route } from "preact-router";
import injectSheet from "react-jss";
import jsonp from "jsonp";
import api from "../../api";

const styles = {
  root: { height: "100%" },
  header: {
    position: "absolute",
    top: 0,
    padding: 10,
    zIndex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    padding: [ 7, 15 ],
    fontSize: 18,
    color: "#fff",
    background: "rgba(87, 135, 173, 0.68)",
    fontWeight: "normal"
  }
};

class MapPage extends Component {
  state = {};

  componentDidMount() {
    if (!api.getToken()) {
      return route("/");
    }

    jsonp(api.media(), (err, resp) => {
      if (resp && resp.data) {
        this.setState({
          photos: resp.data
            .filter(photo => photo.location)
            .map(photo => ({
              photo,
              lat: photo.location.latitude,
              lng: photo.location.longitude
            }))
        });
      }
    });
  }

  onLogoutClick = () => {
    api.setToken("");
    route("/");
  };

  render() {
    const { photos } = this.state;
    const { sheet: { classes } } = this.props;

    if (!photos) {
      return <span>Loading...</span>;
    }

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <h1 className={classes.title}>Your photo map</h1>
          <Button onClick={this.onLogoutClick}>
            Logout
          </Button>
        </div>
        <PhotoMap photos={photos} />
      </div>
    );
  }
}

export default injectSheet(styles)(MapPage);
