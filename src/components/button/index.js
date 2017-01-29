import { h } from "preact";
import injectSheet from "react-jss";

const styles = {
  button: {
    padding: [ 7, 15 ],
    fontSize: 14,
    border: "1px solid #596d82",
    color: "#fff",
    background: "#5787ad",
    "&:hover": { background: "#6ba0ca" }
  }
};

function Button({ sheet: { classes }, className, ...props }) {
  return <button className={`${classes.button} ${className}`} {...props} />;
}

Button.defaultProps = { type: "button", className: "" };

export default injectSheet(styles)(Button);
