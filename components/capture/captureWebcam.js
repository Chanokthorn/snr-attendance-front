import styled from "styled-components";
import React from "react";
import { API_credential } from "../../utils/API";
import Webcam from "react-webcam";
import { isArray } from "../../utils/helper";

import PersonnelList from "../personnelList";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const PersonnelListWrapper = styled.div`
  width: 50vw;
  height: 50vh;
`;

const PersonInfoWrapper = styled.div`
  width: 30vw;
  height: 10vh;
`;

class CaptureWebcam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webcam_active: true,
      dialog_open: false,
      personnel_dialog_open: false,
      personnel_info: null,
      attendant_ids: props.attendant_ids,
      m_id: props.m_id,
      selectable_personnels: []
    };
    this.parent_ref = props.parent_ref;
  }

  onAcceptAttendance = async () => {
    const { m_id, personnel_info } = this.state;
    var bodyFormData = new FormData();
    bodyFormData.set("p_id", personnel_info.p_id);
    // console.log("P_ID: ", personnel_info);
    await API_credential.put("/meeting/attend/" + m_id, bodyFormData).then(
      res => {
        console.log("RESULT: ", res);
        if (res.status === 200) {
          console.log(res.data);
          this.handleAllDialogClose();
          this.props.get_attendant_ids();
          this.getPersonnels();
        } else {
          console.log("cannot add");
          this.setState({ dialog_open: false });
        }
      }
    );
  };

  tick = async () => {
    const {
      webcam_active,
      attendant_ids,
      dialog_open,
      personnel_dialog_open
    } = this.state;
    if (dialog_open || personnel_dialog_open) {
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

  getPersonnels = async () => {
    const { attendant_ids } = this.state;
    const personnels = (await API_credential.get("/personnel")).data;
    var selectable_personnels = [];
    for (var i = 0; i < personnels.length; i++) {
      const id = personnels[i].p_id;
      if (!attendant_ids.includes(id)) {
        selectable_personnels.push(personnels[i]);
      }
    }
    this.setState({ selectable_personnels: selectable_personnels });
  };

  ////// for periodic request ///////

  componentDidMount() {
    this.getPersonnels();
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
    this.setState({ dialog_open: false, personnel_dialog_open: true });
  };

  handleAllDialogClose = () => {
    this.setState({ dialog_open: false, personnel_dialog_open: false });
  };

  handlePersonnelClicked = personnel => {
    // console.log("PERSON CLICKED: ", personnel);
    this.setState(
      { personnel_info: personnel, personnel_dialog_open: false },
      () => this.onAcceptAttendance()
    );
  };

  handlePersonListClosed = () => {
    this.setState({ personnel_dialog_open: false });
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
    const {
      personnel_info,
      dialog_open,
      personnel_dialog_open,
      selectable_personnels
    } = this.state;
    console.log("PERSONNEL INFO: ", personnel_info);
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
          open={dialog_open}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className="need-margin"
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Identification"}
          </DialogTitle>
          <DialogContent>
            <PersonInfoWrapper>
              {personnel_info &&
                personnel_info.p_title +
                  " " +
                  personnel_info.p_firstname +
                  " " +
                  personnel_info.p_lastname}
            </PersonInfoWrapper>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onAcceptAttendance} color="primary">
              Accept
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={personnel_dialog_open}
          keepMounted
          onClose={this.handlePersonListClosed}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className="need-margin"
          maxWidth="lg"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Select personnel"}
          </DialogTitle>
          <DialogContent>
            <PersonnelListWrapper>
              {!personnel_dialog_open ? null : (
                <PersonnelList
                  onSelectPerson={this.handlePersonnelClicked}
                  personnels={selectable_personnels}
                />
              )}
            </PersonnelListWrapper>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handlePersonListClosed} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CaptureWebcam;
