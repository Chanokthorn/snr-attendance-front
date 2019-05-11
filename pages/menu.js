import Layout from "../layouts/layout";
import styled from "styled-components";
import MeetingList from "../components/menu/meetingList";
import React from "react";
import { API_credential, API } from "../utils/API";
import { isArray } from "../utils/helper";
import Router from "next/router";

import MeetingForm from "../components/menu/meetingForm";

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
      meeting_item_modal_open: false,
      new_m_modal_open: false
    };
  }

  async componentDidMount() {
    this.getMeeting();
  }

  getMeeting = async () => {
    const data = (await API_credential.get("/meeting")).data;
    console.log(data);
    this.setState({ meetingList: data }, () => {
      console.log(this.state);
      this.setState({ loaded: true });
    });
  };

  onNewMeeting = async () => {
    const { new_m_title, new_m_committee } = this.state;

    var bodyFormData = new FormData();
    bodyFormData.set("c_id", new_m_committee);

    const data = (await API_credential.put(
      "/meeting/" + new_m_title,
      bodyFormData
    )).data;
    if (data == "success") {
      this.getMeeting();
    }

    // await API_credential.put(
    //   "/meeting/" + new_m_title,
    //   bodyFormData
    // ).then(res => {
    //   console.log(res.data);
    //   if (res.data == "success") {
    //     Router.push({
    //       pathname: "/capture",
    //       query: { m_id: new_m_title }
    //     });
    //   }
    // });
  };

  // onNewMeeting = () => {
  //   const { new_m_title, new_m_committee } = this.state;
  //   Router.push({
  //     pathname: "/capture",
  //     query: { m_id: new_m_title }
  //   });
  // };

  onNewMeetingOpen = () => {
    this.setState({ new_m_modal_open: true });
  };

  onNewMeetingClosed = () => {
    this.setState({ new_m_modal_open: false });
  };

  onMeetingSelected = value => {
    console.log("selected: ", value);
  };

  handleNewMeetingChange = e => {
    this.setState({ new_m_title: e.target.value });
  };

  handleCommitteeChange = e => {
    this.setState({ new_m_committee: e.target.value });
  };

  render() {
    const { loaded, meetingList, new_m_modal_open } = this.state;
    return (
      <Layout>
        <MenuWrapperContainer className="menu-wrapper-container">
          {!loaded ? null : (
            <MenuWrapper className="menu-wrapper">
              <NewMeeting className="new-meeting">
                <button onClick={this.onNewMeetingOpen}>doit</button>
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
          <MeetingForm
            open={new_m_modal_open}
            handleClose={this.onNewMeetingClosed}
            getMeeting={this.getMeeting}
          />
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
