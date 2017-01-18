import { h } from "preact";
import injectSheet from "react-jss";

const thumbSize = 40;
const styles = {
  cluster: {
    position: "relative",
    top: -thumbSize / 2,
    left: -thumbSize / 2,
    width: thumbSize,
    height: thumbSize,
    border: "1px solid #fff",
    boxShadow: "0 0 0 1px #87a5c5"
  },
  photo: { width: thumbSize, height: thumbSize },
  counter: {
    position: "absolute",
    top: -5,
    left: -5,
    padding: [ 2, 5 ],
    fontWeight: "bold",
    borderRadius: "40%",
    background: "#68a4d2",
    color: "#fff"
  }
};

function Cluster({ cluster, sheet: { classes } }) {
  return (
    <div className={classes.cluster}>
      <img role="presentation" className={classes.photo} src={
        cluster.photos[0].images.thumbnail.url
      } />
      <span className={classes.counter}>{cluster.numPoints}</span>
    </div>
  );
}

export default injectSheet(styles)(Cluster)
