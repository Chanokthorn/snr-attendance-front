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
  background-color: green;
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CaptureHeader = styled.div``;

const CaptureContent = styled.div`
  background-color: blue;
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
`;

const AttendantListWrapper = styled.div`
  grid-area: list;
  width: 100%;
  height: 100%;
`;

class Capture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m_id: props.router.query.m_id,
      webcam_active: true,
      attendant_ids: [],
      attendants: []
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
        console.log("unrpocessed: ", res.data);
        this.setState({ attendants: res.data });
        console.log;
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
    console.log(res);
  };

  handleStopClicked = async () => {
    const { m_id } = this.state;
    const url = "/meeting/" + m_id + "/end";
    const res = (await API_credential.post(url)).data;
    console.log(res);
    if (res == "success") {
      Router.push("/menu");
    }
  };

  render() {
    const { m_id, attendant_ids, attendants } = this.state;
    console.log("PROPS TO SEND: ", attendants);
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
              <Button onClick={this.handleBeginClicked}>Begin</Button>
              <Button onClick={this.handleStopClicked}>stop</Button>
            </CaptureWebcamWrapper>
            <AttendantListWrapper>
              <PersonnelList personnels={attendants} />
            </AttendantListWrapper>
          </CaptureContent>
        </CaptureContainer>
      </Layout>
    );
  }
}

export default withRouter(Capture);
