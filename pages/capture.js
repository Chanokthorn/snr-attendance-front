import Layout from "../layouts/layout";
import styled from "styled-components";
import React from "react";
import { API_credential } from "../utils/API";
import Router from "next/router";
import { withRouter } from "next/router";
import CaputreWebcam from "../components/capture/captureWebcam";
import PersonnelList from "../components/personnelList";
import { Button } from "semantic-ui-react";

const CaptureContainer = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CaptureHeader = styled.div``;

const CaptureContent = styled.div`
  width: 70%;
  height: 70%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "webcam list";
`;

const CaptureWebcamWrapper = styled.div`
  grid-area: webcam;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .need-margin {
    padding: 2%;
  }
  .webcam-button{
    width: 100%;
    margin 2vh;
  }
`;

const AttendantListWrapper = styled.div`
  grid-area: list;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 4vh 1fr;
  grid-template-areas:
    "header"
    "list";
`;

const PersonnelListHeader = styled.div`
  background-color: #a0a3a5;
  grid-area: header;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
`;

const PersonnelListWrapper = styled.div`
  grid-area: list;
`;

const HeaderInfo = styled.div`
  font-size: 2vh;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 1vh;
`;
const HeaderSubInfo = styled.div`
  font-size: 2vh;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1vh;
`;
class Capture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m_id: props.router.query.m_id,
      webcam_active: true,
      attendant_ids: [],
      attendants: [],
      began: false
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.get_attendant_ids();
  }

  get_attendant_ids = async () => {
    const { m_id } = this.state;
    let { attendant_ids } = this.state;
    await API_credential.get("/meeting/" + m_id)
      .then(res => {
        // console.log("unrpocessed: ", res.data);
        this.setState({ attendants: res.data });
        res.data.map(attendant => {
          attendant_ids.push(attendant.p_id);
        });
      })
      .then(() => {
        console.log(this.state);
      });
  };

  handleBeginClicked = async () => {
    const { m_id } = this.state;
    const url = "/meeting/" + m_id + "/start";
    const res = (await API_credential.post(url)).data;
    this.setState({ began: true });
    // console.log(res);
  };

  handleStopClicked = async () => {
    const { m_id } = this.state;
    const url = "/meeting/" + m_id + "/end";
    const res = (await API_credential.post(url)).data;
    // console.log(res);
    if (res == "success") {
      Router.push("/menu");
    }
  };

  render() {
    const { m_id, attendant_ids, attendants, began } = this.state;
    // console.log("PROPS TO SEND: ", attendants);
    return (
      <Layout page_role="secretary">
        <CaptureContainer className="capture-container">
          <CaptureHeader className="capture-header" />
          <CaptureContent className="capture-content">
            <CaptureWebcamWrapper
              className="capture-webcam-wrapper"
              ref={this.myRef}
            >
              <CaputreWebcam
                m_id={m_id}
                attendant_ids={attendant_ids}
                get_attendant_ids={this.get_attendant_ids}
                parent_ref={this.myRef}
              />
              <Button
                onClick={this.handleBeginClicked}
                className="webcam-button"
                disabled={began}
              >
                Begin
              </Button>
              <Button
                onClick={this.handleStopClicked}
                className="webcam-button"
              >
                stop
              </Button>
            </CaptureWebcamWrapper>
            <AttendantListWrapper>
              <PersonnelListHeader>
                <HeaderInfo>ATTENDANCES</HeaderInfo>
                <HeaderSubInfo>COUNT: {attendants.length}</HeaderSubInfo>
              </PersonnelListHeader>
              <PersonnelListWrapper>
                <PersonnelList personnels={attendants} />
              </PersonnelListWrapper>
            </AttendantListWrapper>
          </CaptureContent>
        </CaptureContainer>
      </Layout>
    );
  }
}

export default withRouter(Capture);
