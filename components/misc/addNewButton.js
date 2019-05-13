import { main_theme } from "../../theme";

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";

const styles = theme => ({
  card: {
    display: "flex",
    margin: "1vh 0 1vh 0",
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: main_theme.button,
    "&:hover": {
      backgroundColor: main_theme.buttonHovered
    }
  },
  content: {
    display: "flex",
    fontSize: "5vh",
    color: main_theme.buttonFont,
    alignItems: "center",
    flexGrow: 1
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: "5vh",
    color: main_theme.buttonFont
  }
});

function AddNewButton(props) {
  const { value, onClick, classes, theme } = props;
  return (
    <Card className={classes.card} onClick={onClick}>
      <CardContent className={classes.iconContainer}>
        <AddCircleOutline className={classes.icon} />
      </CardContent>
      <CardContent className={classes.content}>{value}</CardContent>
    </Card>
  );
}

AddNewButton.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AddNewButton);
