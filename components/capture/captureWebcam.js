import styled from "styled-components";
import React from "react";
import { API_credential } from "../../utils/API";
import Webcam from "react-webcam";
import { isArray } from "../../utils/helper";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class CaptureWebcam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webcam_active: true,
      dialog_open: false,
      personnel_info: null,
      attendant_ids: props.attendant_ids,
      m_id: props.m_id
    };
    this.parent_ref = props.parent_ref;
  }

  onAcceptAttendance = async () => {
    const { m_id, personnel_info } = this.state;
    var bodyFormData = new FormData();
    bodyFormData.set("p_id", personnel_info.p_id);
    console.log("P_ID: ", personnel_info);
    await API_credential.put("/meeting/attend/" + m_id, bodyFormData).then(
      res => {
        console.log("RESULT: ", res);
        if (res.status === 200) {
          console.log(res.data);
          this.handleClose();
          this.props.get_attendant_ids();
        } else {
          console.log("cannot add");
          this.handleClose();
        }
      }
    );
  };

  tick = async () => {
    const { webcam_active, attendant_ids, dialog_open } = this.state;
    if (dialog_open) {
      return;
    }
    if (this.webcam != null && webcam_active) {
      const image = this.webcam.getScreenshot();
      var bodyFormData = new FormData();
      bodyFormData.set("image", image);
      await API_credential.post("/recog/personnel", bodyFormData).then(res => {
        console.log(res.data);
        if (res.data != "NOT_FOUND") {
          if (!attendant_ids.includes(res.data.p_id)) {
            this.setState(
              {
                personnel_info: res.data
              },
              () => {
                this.setState({ dialog_open: true });
              }
            );
          } else {
            console.log("already logged in");
          }
        }
      });
    }
  };

  ////// for periodic request ///////

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  ///////////////////////////////////

  handleClickOpen = () => {
    this.setState({ dialog_open: true });
  };

  handleClose = () => {
    this.setState({ dialog_open: false });
  };

  setRef = webcam => {
    this.webcam = webcam;
    this.setState({ webcam_active: true });
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    const { personnel_info } = this.state;
    return (
      <div>
        <Webcam
          audio={false}
          height={"100%"}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={"100%"}
          videoConstraints={videoConstraints}
          className="need-margin"
        />
        <Dialog
          open={this.state.dialog_open}
          // TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className="need-margin"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Identification"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-personnel-information">
              {JSON.stringify(personnel_info)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.onAcceptAttendance} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CaptureWebcam;
