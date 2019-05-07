import styled from "styled-components";
import React from "react";
import Layout from "../../layouts/layout";

const MeetingWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "meetings info";
  width: 100%;
  height: 100%;
  position: absolute;
`;

const MembersWrapper = styled.div`
  background-color: black;
  // display: grid;
  // grid-template-columns: 50% 50%;
  // grid-template-areas: ". list";
  // position: absolute;
  // background-color: blue;
  // background-color: #66b3ff;
  // z-index: -10;
`;

const MemberList = styled.div`
    grid-area: list
    width: inherit;
    height: inherit;
    background-color: green;
    // z-index: -9
`;

class Members extends React.Component {
  constructor() {
    super();
    this.state = {
      members: [],
      loaded: false
    };
  }
  componentDidMount() {
    fetch("./static/mock_members.json")
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ members: response });
      })
      .then(() => {
        this.setState({ loaded: true });
      });
  }
  render() {
    // console.log(meetingList, loaded);
    return (
      <div className="meeting-list">
        <div>
          <MeetingWrapper className="wrapper-grid" />
        </div>
      </div>
    );
  }
  // render() {
  //   const { members, loaded } = this.state;
  //   return (
  //     <div>
  //       kuyraiwania
  //       <MembersWrapper className="members-wrapper">
  //         {/* <MemberList /> */}
  //       </MembersWrapper>
  //     </div>
  //   );
  // }
}

export default Members;
