import Layout from "../layouts/layout";
import styled from "styled-components";
import React from "react";
import { API_credential } from "../utils/API";
import Router from "next/router";
import { withRouter } from "next/router";
import CaputreWebcam from "../components/capture/captureWebcam";
import AttendantList from "../components/capture/attendantList";

const CaptureContainer = styled.div`
  background-color: green;
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CaptureHeader = styled.div``;

const CaptureContent = styled.div``;

const AttendantListWrapper = styled.div``;

class Capture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m_id: props.router.query.m_id,
      webcam_active: true,
      attendant_ids: [],
      attendants: []
    };
  }

  componentDidMount() {
    this.get_attendant_ids();
  }

  get_attendant_ids = async () => {
    const { m_id } = this.state;
    let { attendant_ids } = this.state;
    await API_credential.get("/meeting/" + m_id)
      .then(res => {
        this.setState({ attendants: res.data });
        res.data.map(attendant => {
          attendant_ids.push(attendant.p_id);
        });
      })
      .then(() => {
        console.log(this.state);
      });
  };

  handleStopClicked = () => {
    Router.push("/menu");
  };

  render() {
    const { m_id, attendant_ids } = this.state;
    return (
      <Layout>
        <CaptureContainer className="capture-container">
          <CaptureHeader className="capture-header" />
          <CaptureContent className="capture-content">
            <CaputreWebcam m_id={m_id} attendant_ids={attendant_ids} />
            <button onClick={this.handleStopClicked}>stop</button>
            <AttendantListWrapper>
              <AttendantList />
            </AttendantListWrapper>
          </CaptureContent>
        </CaptureContainer>
      </Layout>
    );
  }
}

export default withRouter(Capture);
