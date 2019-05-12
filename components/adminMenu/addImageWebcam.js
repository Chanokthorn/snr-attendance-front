import styled from "styled-components";
import React from "react";
import { API_credential } from "../../utils/API";
import Webcam from "react-webcam";
import { Button } from "semantic-ui-react";

const AddImageWebcamGrid = styled.div`
  width: inherit;
  height: inherit;
  display: grid;
  grid-template-rows: 5fr 1fr;
  grid-template-areas:
    "webcam"
    "button";
`;

const WebcamWrapper = styled.div`
  grid-area: webcam;
`;

const ButtonWrapper = styled.div`
  grid-area: button;
`;

class AddImageWebcam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.parent_ref = props.parent_ref;
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  onCapture = async () => {
    const { onClose, personnel } = this.props;
    const image = this.webcam.getScreenshot();
    var bodyFormData = new FormData();
    bodyFormData.set("image", image);
    const url = "/recog/personnel/" + personnel.p_id;
    const data = (await API_credential.put(url, bodyFormData)).data;
    if (data == "success") {
      onClose(true);
    }
  };

  render() {
    const videoConstraints = {
      width: 720,
      height: 720,
      facingMode: "user"
    };
    return (
      <AddImageWebcamGrid>
        <WebcamWrapper>
          <Webcam
            audio={false}
            height={"100%"}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={"100%"}
            videoConstraints={videoConstraints}
            className="need-margin"
          />
        </WebcamWrapper>
        <ButtonWrapper>
          <Button onClick={this.onCapture}>Capture</Button>
        </ButtonWrapper>
      </AddImageWebcamGrid>
    );
  }
}

export default AddImageWebcam;
