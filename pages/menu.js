import Layout from "../layouts/layout";
import styled from "styled-components";
import MeetingList from "../components/menu/meetingList";
import React from "react";
import { API_credential } from "../utils/API";
import { isArray } from "../utils/helper";
import Router from "next/router";

// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";

const MenuWrapper = styled.div`
  background-color: orange;
  width: 70%;
  height: 70%;
  display: grid;
  grid-template-rows: 1fr 5fr;
  grid-template-areas:
    "new-meeting"
    "meeting-list";
`;

const MenuWrapperContainer = styled.div`
  background-color: green;
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MeetingListWrapper = styled.div`
  background-color: red;
  grid-area: meeting-list;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewMeeting = styled.div`
  background-color: purple;
  grid-area: new-meeting;
  margin: 1vh;
`;

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      meetingList: [],
      new_meeting_value: "",
      new_meeting_committee: "",
      new_meeting_modal_open: false,
      meeting_item_modal_open: false
    };
  }

  async componentDidMount() {
    await API_credential("/meeting/meetings").then(res => {
      if (isArray(res.data)) {
        console.log(res.data);
        this.setState({ meetingList: res.data }, () => {
          console.log(this.state);
          this.setState({ loaded: true });
        });
      }
    });
  }

  onNewMeeting = async () => {
    const { new_meeting_value, new_meeting_committee } = this.state;

    var bodyFormData = new FormData();
    bodyFormData.set("c_id", new_meeting_committee);

    await API_credential.put(
      "/meeting/" + new_meeting_value,
      bodyFormData
    ).then(res => {
      console.log(res.data);
      if (res.data == "success") {
        Router.push("/capture");
      }
    });
  };
  onNewMeetingClosed = () => {
    this.setState({ new_meeting_modal_open: false });
  };

  onMeetingSelected = value => {
    console.log("selected: ", value);
  };

  handleNewMeetingChange = e => {
    this.setState({ new_meeting_value: e.target.value });
  };

  handleCommitteeChange = e => {
    this.setState({ new_meeting_committee: e.target.value });
  };

  render() {
    const { loaded, meetingList, new_meeting_modal_open } = this.state;
    return (
      <Layout>
        <MenuWrapperContainer className="menu-wrapper-container">
          {!loaded ? null : (
            <MenuWrapper className="menu-wrapper">
              <NewMeeting className="new-meeting">
                <button onClick={this.onNewMeeting}>doit</button>
                meeting
                <input onChange={this.handleNewMeetingChange} />
                committee
                <input onChange={this.handleCommitteeChange} />
              </NewMeeting>

              <MeetingListWrapper>
                <MeetingList
                  className="meeting-list"
                  meetingList={meetingList}
                  onMeetingSelected={this.onMeetingSelected}
                />
              </MeetingListWrapper>
            </MenuWrapper>
          )}
        </MenuWrapperContainer>
      </Layout>
    );
  }
}

export default Menu;

// Menu.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// const MenuWrapped = withStyles(styles)(Menu);

// export default MenuWrapped;
