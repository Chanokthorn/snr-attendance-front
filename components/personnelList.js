import React from "react";
import { timingSafeEqual } from "crypto";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import ProfileCard from "./profileCard";

const PersonCard = styled.div`
  background-color: yellow;
  // width: 100%;
  height: 10%;
  margin: 1vh;
  text-align: center;
  display: flex;
  flex-direction: row;
`;

const PersonCardContent = styled.div`
  flex-grow: 1;
`;

const PersonCardAddImage = styled.div`
  background-color: white;
  z-index: 1000;
`;

const PersonItem = props => {
  return (
    <PersonCard {...props}>
      <PersonCardContent
        onClick={() => {
          if (props.onSelectPerson) {
            props.handlePersonSelect(props.value);
          } else {
            props.handlePersonnelOpen(props.value);
          }
        }}
      >
        {props.p_firstname} {props.p_lastname}
      </PersonCardContent>
      {props.onAddImage && (
        <PersonCardAddImage onClick={() => props.onAddImage(props)}>
          {" "}
          Add image{" "}
        </PersonCardAddImage>
      )}
    </PersonCard>
  );
};

const PersonContainer = styled.div``;

const Persons = styled.div`
  background-color: orange;
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
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
    return (
      <Persons>
        {personnels.map((personnel, index) => (
          <PersonItem
            {...personnel}
            key={"attendant-item" + personnel.p_id}
            handlePersonnelOpen={this.handlePersonnelOpen}
            handlePersonSelect={this.handlePersonSelect}
            onSelectPerson={onSelectPerson}
            value={index}
            {...this.props}
          />
        ))}
        {!onSelectPerson ? null : (
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
    );
  }
}

export default PersonnelList;
