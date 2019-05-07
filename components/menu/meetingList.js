import React from "react";
import styled from "styled-components";
import { stringify } from "querystring";

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
    {props.m_id}
  </MeetingCard>
);

const MeetingItemContainer = styled.div`
  background-color: green;
  width: inherit;
  height: inherit;
  margin: 1vh;
  overflow-y: scroll;
`;

class MeetingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingList: props.meetingList
    };
  }

  onMeetingSelected = value => {
    console.log("meeting-item-clicked");
    this.props.onMeetingSelected(value);
  };

  render() {
    const { meetingList } = this.props;
    return (
      <MeetingItemContainer className="meeting-item-container">
        {meetingList.map((m_id, index) => (
          <MeetingItem
            m_id={m_id}
            key={"meeting-item-" + index}
            onMeetingSelected={this.onMeetingSelected}
          />
        ))}
      </MeetingItemContainer>
    );
  }
}

export default MeetingList;
