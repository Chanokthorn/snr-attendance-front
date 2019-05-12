import styled from "styled-components";
import MeetingList from "../menu/meetingList";
import { API_credential, API } from "../../utils/API";
import { isArray } from "../../utils/helper";
import Router from "next/router";

import MeetingForm from "./meetingForm";

const IncomingMenuGrid = styled.div`
  width: inherit;
  height: inherit;
  display: grid;
  grid-template-rows: 1fr 5fr;
  grid-template-areas:
    "new-meeting"
    "meeting-list";
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

class IncomingMenu extends React.Component {
  constructor(props) {
    super(props);
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
    const data = (await API_credential.get("/meeting/incoming")).data;
    console.log(data);
    this.setState({ meetingList: data }, () => {
      console.log(this.state);
      this.setState({ loaded: true });
    });
  };
  //   onNewMeeting = async () => {
  //     const { new_m_title, new_m_committee } = this.state;

  //     var bodyFormData = new FormData();
  //     bodyFormData.set("c_id", new_m_committee);

  //     const data = (await API_credential.put(
  //       "/meeting/" + new_m_title,
  //       bodyFormData
  //     )).data;
  //     if (data == "success") {
  //       this.getMeeting();
  //     }
  //   };

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

  // onNewMeeting = () => {
  //   const { new_m_title, new_m_committee } = this.state;
  //   Router.push({
  //     pathname: "/capture",
  //     query: { m_id: new_m_title }
  //   });
  // };

  render() {
    const { loaded, meetingList, new_m_modal_open } = this.state;
    const { show } = this.props;
    if (!show) {
      return null;
    } else {
      return (
        <IncomingMenuGrid className="incoming-menu">
          <NewMeeting className="new-meeting">
            <button onClick={this.onNewMeetingOpen}>doit</button>
          </NewMeeting>
          <MeetingListWrapper>
            <MeetingList
              className="meeting-list"
              meetingList={meetingList}
              onMeetingSelected={this.onMeetingSelected}
              active={true}
            />
          </MeetingListWrapper>
          <MeetingForm
            open={new_m_modal_open}
            handleClose={this.onNewMeetingClosed}
            getMeeting={this.getMeeting}
          />
        </IncomingMenuGrid>
      );
    }
  }
}

export default IncomingMenu;
