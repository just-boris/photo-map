import { h } from "preact";
import injectSheet from "react-jss";

const thumbSize = 40;
const styles = {
  marker: {
    position: "relative",
    top: -thumbSize / 2,
    left: -thumbSize / 2,
    width: thumbSize,
    height: thumbSize,
    border: "1px solid #fff",
    boxShadow: "0 0 0 1px #87a5c5"
  }
};

function Place({ photo, sheet: { classes } }) {
  return <img role="presentation" className={classes.marker} src={
    photo.images.thumbnail.url
  } />;
}

export default injectSheet(styles)(Place)
