import styled from "styled-components";
import MeetingList from "../menu/meetingList";
import { API_credential, API } from "../../utils/API";

const MeetingListWrapper = styled.div`
  grid-area: meeting-list;
  width: 100%;
  height: 70vh;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class IncomingMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      meetingList: [],
      meeting_item_modal_open: false
    };
  }

  async componentDidMount() {
    this.getMeeting();
  }

  getMeeting = async () => {
    const data = (await API_credential.get("/meeting/history")).data;
    console.log(data);
    this.setState({ meetingList: data }, () => {
      console.log(this.state);
      this.setState({ loaded: true });
    });
  };

  onMeetingSelected = value => {
    console.log("selected: ", value);
  };

  render() {
    const { loaded, meetingList, new_m_modal_open } = this.state;
    const { show } = this.props;
    if (!show) {
      return null;
    } else {
      return (
        <MeetingListWrapper>
          <MeetingList
            className="meeting-list"
            meetingList={meetingList}
            onMeetingSelected={this.onMeetingSelected}
            active={false}
          />
        </MeetingListWrapper>
      );
    }
  }
}

export default IncomingMenu;
