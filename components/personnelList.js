import React from "react";
import { timingSafeEqual } from "crypto";
import styled from "styled-components";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import ProfileCard from "./profileCard";
import { main_theme } from "../theme";

import { AddPhotoAlternate } from "@material-ui/icons";

const styles = theme => ({
  card: {
    display: "flex",
    margin: "1vh 0 1vh 0",
    height: "10vh",
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: main_theme.item,
    "&:hover": {
      backgroundColor: main_theme.itemHovered
    }
  },
  content: {
    display: "flex",
    fontSize: "2vh",
    color: main_theme.buttonFont,
    alignItems: "center",
    flexGrow: 1
  },
  subContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: main_theme.buttonActive
    }
  },
  icon: {
    fontSize: "4vh",

    color: main_theme.buttonFont
  }
});

const PersonItemNonStyled = props => {
  const { classes, value, p_firstname, p_lastname, onAddImage } = props;
  return (
    <Card className={classes.card}>
      <CardContent
        className={classes.content}
        onClick={() => {
          if (props.onSelectPerson) {
            props.handlePersonSelect(value);
          } else {
            props.handlePersonnelOpen(value);
          }
        }}
      >
        {p_firstname} {p_lastname}
      </CardContent>
      {onAddImage && (
        <CardContent
          className={classes.iconContainer}
          onClick={() => props.onAddImage(props)}
        >
          <AddPhotoAlternate className={classes.icon} />
        </CardContent>
      )}
    </Card>
  );
};

PersonItemNonStyled.propTypes = {
  classes: PropTypes.object.isRequired
};

const PersonItem = withStyles(styles)(PersonItemNonStyled);

const PersonContainer = styled.div``;

const PersonsWrapper = styled.div`
  width: inherit;
  height: inherit;
`;

const PersonItemWrapper = styled.div`
  height: 10vh;
  margin: 1vh;
`;

const Persons = styled.div`
  width: inherit;
  height: inherit;
  // display: grid;
  // grid-auto-flow: row;
  display: flex;
  flex-direction: column;
  // overflow-y: scroll;
  justify-content: flex-start;
  align-item: center;
`;

class PersonnelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personnel_dialog_open: false,
      personnel_selected_info: null,
      personnels: props.personnels
    };
    console.log("PROPS PERSONNEL: ", props);
  }

  handlePersonnelOpen = value => {
    console.log("card-item-clicked: ", value);
    console.log("assigned value: ", this.props.personnels);
    this.setState({
      personnel_dialog_open: true,
      personnel_selected_info: this.props.personnels[value]
    });
  };

  handlePersonnelClose = () => {
    this.setState({
      personnel_dialog_open: false,
      personnel_selected_info: null
    });
  };

  handlePersonSelect = value => {
    const { personnels, onSelectPerson } = this.props;
    if (onSelectPerson) {
      const personnel = personnels[value];
      onSelectPerson(personnel);
    }
  };

  render() {
    const { personnel_dialog_open, personnel_selected_info } = this.state;
    const { personnels, onAddImage, onSelectPerson } = this.props;
    // console.log("value: ", this.state.value);
    // console.log("sel info: ", personnel_selected_info);
    // console.log("PERSONNELS: ", personnels);
    console.log("OPEN: ", personnel_dialog_open);
    return (
      <PersonsWrapper>
        <Persons>
          {personnels.map((personnel, index) => (
            <PersonItemWrapper>
              <PersonItem
                {...personnel}
                key={"attendant-item" + personnel.p_id}
                handlePersonnelOpen={this.handlePersonnelOpen}
                handlePersonSelect={this.handlePersonSelect}
                onSelectPerson={onSelectPerson}
                value={index}
                {...this.props}
              />
            </PersonItemWrapper>
          ))}
          {onSelectPerson ? null : (
            <Dialog
              open={personnel_dialog_open}
              keepMounted
              onClose={this.handlePersonnelClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              className="need-margin"
              maxWidth="lg"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Personnel"}
              </DialogTitle>
              <DialogContent>
                {!personnel_dialog_open ? null : (
                  <PersonContainer>
                    <ProfileCard
                      {...personnel_selected_info}
                      onAddImage={onAddImage}
                    />
                  </PersonContainer>
                )}
              </DialogContent>
            </Dialog>
          )}
        </Persons>
      </PersonsWrapper>
    );
  }
}

export default PersonnelList;
