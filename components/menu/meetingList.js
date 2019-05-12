import React from "react";
import styled from "styled-components";
import { stringify } from "querystring";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { PlayCircleFilled } from "@material-ui/icons";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";

import PersonnelList from "../personnelList";

import { API_credential } from "../../utils/API";
import { sortByStartSchedule } from "../../utils/helper";

import Router from "next/router";

const MeetingCard = styled.div`
  background-color: blue;
  height: 8vh;
  margin: 1vh;
  display: flex;
  flex-direction: row;
  // display: grid;
  // grid-template-columns: 5fr 1fr;
  // grid-template-areas: "info button";
`;
const MeetingCardFiller = styled.div`
  flex-grow: 1;
`;
const MeetingCardInfo = styled.div`
  // grid-area: info;
`;
const MeetingCardButton = styled.div`
  // grid-area: button;
`;

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  iconHover: {
    color: yellow[500],
    "&:hover": {
      color: yellow[800]
    }
  }
});

const MeetingItem = props => {
  const { classes, m_id } = props;
  return (
    <MeetingCard
      className="meeting-card"
      onClick={() => props.onMeetingSelected(props.m_id)}
    >
      <MeetingCardInfo>
        {props.m_title} start:{props.m_start_schedule}
      </MeetingCardInfo>
      <MeetingCardFiller />
      {props.active == true && (
        <MeetingCardButton>
          <PlayCircleFilled
            className={classes.iconHover}
            color="action"
            style={{ fontSize: 30 }}
            onClick={
              () => Router.push("/capture?m_id=" + m_id, "/capture/" + m_id)
              // Router.push({
              //   pathname: "/capture",
              //   query: { m_id: m_id }
              // })
            }
          />
        </MeetingCardButton>
      )}
    </MeetingCard>
  );
};

MeetingItem.propTypes = {
  classes: PropTypes.object.isRequired
};

const StyledMeetingItem = withStyles(styles)(MeetingItem);

const MeetingItemContainer = styled.div`
  background-color: green;
  width: inherit;
  height: inherit;
  // margin: 1vh;
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
      attendants: [],
      sorted: false
    };
  }

  componentDidMount() {
    this.sortMeetingList();
  }

  sortMeetingList = async () => {
    const { meetingList } = this.state;
    let new_meetingList = meetingList;
    new_meetingList.sort(sortByStartSchedule);
    this.setState({ meetingList: new_meetingList, sorted: true });
  };

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
    const { meetingList, active } = this.props;
    const { attendants, meeting_dialog_open, sorted } = this.state;
    return (
      <MeetingItemContainer className="meeting-item-container">
        {sorted &&
          meetingList.map((meeting, index) => (
            <StyledMeetingItem
              {...meeting}
              key={"meeting-item-" + index}
              onMeetingSelected={this.onMeetingSelected}
              active={active}
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
