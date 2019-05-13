import React from "react";
import styled from "styled-components";
import { stringify } from "querystring";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { PlayCircleFilled } from "@material-ui/icons";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { main_theme } from "../../theme";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import PersonnelList from "../personnelList";

import { API_credential } from "../../utils/API";

import Router from "next/router";

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

const MeetingItemNonStyled = props => {
  const { classes, m_id, active } = props;
  return (
    <Card className={classes.card}>
      <CardContent
        className={classes.content}
        onClick={() => props.onMeetingSelected(props.m_id)}
      >
        {props.m_title}
      </CardContent>
      <CardContent className={classes.subContent}>
        start:{props.m_start_schedule}
      </CardContent>
      {active && (
        <CardContent className={classes.iconContainer}>
          <PlayCircleFilled
            className={classes.icon}
            onClick={async () => {
              const url = "/meeting/" + m_id + "/init";
              const data = (await API_credential.post(url)).data;
              Router.push("/capture?m_id=" + m_id, "/capture/" + m_id);
            }}
          />
        </CardContent>
      )}
    </Card>
  );
};

// MeetingItemNonStyled.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired
// };

// const MeetingItem = withStyles(styles, { withTheme: true })(
//   MeetingItemNonStyled
// );

MeetingItemNonStyled.propTypes = {
  classes: PropTypes.object.isRequired
};

const MeetingItem = withStyles(styles)(MeetingItemNonStyled);

const MeetingItemContainer = styled.div`
  // background-color: #a0a3a5;
  border-radius: 10px;
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const AttendanceContainer = styled.div`
  width: 50vw;
  height: 50vh;
`;

const ItemWrapper = styled.div`
  height: 10vh;
  margin: 1vh;
`;

class MeetingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingList: props.meetingList,
      meeting_dialog_open: false,
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
    const { meetingList, active } = this.props;
    const { attendants, meeting_dialog_open } = this.state;
    return (
      <MeetingItemContainer className="meeting-item-container">
        {meetingList.map((meeting, index) => (
          <ItemWrapper>
            <MeetingItem
              {...meeting}
              key={"meeting-item-" + index}
              onMeetingSelected={this.onMeetingSelected}
              active={active}
            />
          </ItemWrapper>
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
            {" "}
            {!meeting_dialog_open ? null : (
              <AttendanceContainer>
                <PersonnelList personnels={attendants} />
              </AttendanceContainer>
            )}
          </DialogContent>
        </Dialog>
      </MeetingItemContainer>
    );
  }
}

export default MeetingList;
