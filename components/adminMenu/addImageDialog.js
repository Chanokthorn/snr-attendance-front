import styled from "styled-components";
import { API_credential } from "../../utils/API";
import AddImageWebcam from "./addImageWebcam";
import AddImageDropFile from "./addImageDropFile";
import { Button } from "semantic-ui-react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const AddImageGrid = styled.div`
  width: 50vh;
  height: 70vh;
  display: grid;
  grid-template-rows: 1fr 5fr;
  grid-template-areas:
    "header"
    "receiver";
`;

const AddImageHeader = styled.div`
  grid-area: header;
`;

const AddImageReceiver = styled.div`
  grid-area: receiver;
`;

class AddImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1
      // open: props.open,
      // onClose: propse
    };
  }

  handleTabChange = (e, value) => {
    this.setState({ tab: value });
  };

  renderContent = () => {
    const { tab } = this.state;
    const { personnel, onClose } = this.props;
    return (
      <AddImageGrid>
        <AddImageHeader className="add-image-header">
          Add image of {personnel.p_firstname} {personnel.p_lastname}
        </AddImageHeader>
        <AddImageReceiver>
          <Tabs
            value={tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="UPLOAD" />
            <Tab label="WEBCAM" />
          </Tabs>
          {tab === 0 && (
            <AddImageDropFile onClose={onClose} personnel={personnel} />
          )}
          {tab === 1 && (
            <AddImageWebcam onClose={onClose} personnel={personnel} />
          )}
        </AddImageReceiver>
      </AddImageGrid>
    );
  };

  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog
        open={open}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className="need-margin"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-slide-title">Add image</DialogTitle>
        <DialogContent>{open && this.renderContent()}</DialogContent>
      </Dialog>
    );
  }
}

export default AddImage;
