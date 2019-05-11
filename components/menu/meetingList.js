import React from "react";
import styled from "styled-components";
import { stringify } from "querystring";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import PersonnelList from "../personnelList";

import { API_credential } from "../../utils/API";

const MeetingCard = styled.div`
  background-color: blue;
  width: 100%;
  height: 10%;
  margin: 1vh;
`;

const MeetingItem = props => (
  <MeetingCard
    className="meeting-card"
    onClick={() => props.onMeetingSelected(props.m_id)}
  >
    {props.m_title}
  </MeetingCard>
);

const MeetingItemContainer = styled.div`
  background-color: green;
  width: inherit;
  height: inherit;
  margin: 1vh;
  overflow-y: scroll;
`;

const AttendanceContainer = styled.div`
  width: 50vw;
  height: 50vh;
`;

class MeetingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingList: props.meetingList,
      meeting_dialog_open: false,
      meeting_selected: null,
      attendants: []
    };
  }

  onMeetingSelected = async value => {
    try {
      this.setState({ meeting_dialog_open: true });
      const data = (await API_credential.get("/meeting/" + value)).data;
      this.setState({ attendants: data });
    } catch (e) {
      console.error(e);
    }
  };

  handleClose = () => {
    this.setState({
      meeting_dialog_open: false,
      meeting_selected: null,
      attendants: []
    });
  };

  render() {
    const { meetingList } = this.props;
    const { attendants, meeting_dialog_open, meeting_selected } = this.state;
    return (
      <MeetingItemContainer className="meeting-item-container">
        {meetingList.map((meeting, index) => (
          <MeetingItem
            {...meeting}
            key={"meeting-item-" + index}
            onMeetingSelected={this.onMeetingSelected}
          />
        ))}
        <Dialog
          open={meeting_dialog_open}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className="need-margin"
          maxWidth="lg"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Identification"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-personnel-information">
              {" "}
              {!meeting_dialog_open ? null : (
                <AttendanceContainer>
                  <PersonnelList personnels={attendants} />
                </AttendanceContainer>
              )}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </MeetingItemContainer>
    );
  }
}

export default MeetingList;
