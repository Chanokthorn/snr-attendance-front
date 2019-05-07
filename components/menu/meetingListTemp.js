import styled from "styled-components";
import React from "react";
import Page from "../../components/page";
import Layout from "../../layouts/layout";

const MeetingCard = styled.div`
  display: flex;
  flex-direction: row;
  height: 10vh;
  background-color: ${props => (props.selected == true ? "purple" : "red")};
  margin-bottom: 0.5vh;
`;

const MeetingCardItem = props => {
  return (
    <MeetingCard
      onClick={() => {
        props.onClick(props.meeting);
      }}
      selected={props.selected}
    >
      {props.meeting}
    </MeetingCard>
  );
};

const MeetingWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "meetings info";
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Meetings = styled.div`
  grid-area: meetings
  display: flex;
  flex-direction: column;
  background-color: yellow;
  height: inherit;
  overflow-y: scroll;
`;

const MeetingInfo = styled.div`
  grid-area: info;
  background-color: green;
  height: inherit;
`;
class MeetingList extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      meetingList: [],
      selectedMeeting: null
    };
  }
  componentDidMount = () => {
    fetch("./static/mock_meetings.json")
      .then(function(response) {
        return response.json();
      })
      .then(response => {
        this.setState({ meetingList: response });
      })
      .then(response => {
        this.setState({ loaded: true });
      });
  };
  onMeetingCardItemClicked = value => {
    const { selectedMeeting } = this.state;
    if (selectedMeeting == value) {
      this.setState({ selectedMeeting: null });
    } else {
      this.setState({ selectedMeeting: value });
    }
  };
  render() {
    const { meetingList, loaded, selectedMeeting } = this.state;
    // console.log(meetingList, loaded);
    return (
      <div className="mee">
        {!loaded ? null : (
          <div>
            <MeetingWrapper className="wrapper-grid">
              <Meetings>
                {meetingList.map((meeting, idx) => (
                  <MeetingCardItem
                    meeting={meeting}
                    key={"meeting-item-" + String(idx)}
                    onClick={this.onMeetingCardItemClicked}
                    selected={meeting == selectedMeeting}
                  />
                ))}
              </Meetings>
              {selectedMeeting == null ? null : <MeetingInfo />}
            </MeetingWrapper>
          </div>
        )}
      </div>
    );
  }
}

export default MeetingList;
