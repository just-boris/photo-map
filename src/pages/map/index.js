import { h, Component } from "preact";
import PhotoMap from "../../components/photo-map";
import { route } from "preact-router";
import injectSheet from "react-jss";
import jsonp from "jsonp";
import api from "../../api";

const styles = {
  root: { height: "100%" },
  header: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    margin: "auto",
    padding: [ 7, 15 ],
    fontSize: 18,
    color: "#fff",
    background: "rgba(87, 135, 173, 0.68)",
    fontWeight: "normal"
  },
  logout: {
    margin: 10,
    padding: [ 7, 15 ],
    fontSize: 14,
    border: "1px solid #596d82",
    color: "#fff",
    background: "#5787ad"
  }
};

class MapPage extends Component {
  state = {};

  componentDidMount() {
    if (!api.getToken()) {
      return route("/");
    }

    jsonp(api.media(), (err, resp) => {
      if (resp) {
        this.setState({
          photos: resp.data.map(photo => ({
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
          <button
            type="button"
            className={classes.logout}
            onClick={this.onLogoutClick}
          >
            Logout
          </button>
        </div>
        <PhotoMap photos={photos} />
      </div>
    );
  }
}

export default injectSheet(styles)(MapPage);
