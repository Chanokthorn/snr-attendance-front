import styled from "styled-components";
import { API_credential } from "../../utils/API";
import AddImageWebcam from "./addImageWebcam";
import { Button } from "semantic-ui-react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
      // open: props.open,
      // onClose: propse
    };
  }

  renderContent = () => {
    const { personnel, onClose } = this.props;
    return (
      <AddImageGrid>
        <AddImageHeader className="add-image-header">
          Add image of {personnel.p_firstname} {personnel.p_lastname}
        </AddImageHeader>
        <AddImageReceiver>
          {/* <AddImageDropFile /> */}
          <AddImageWebcam onClose={onClose} personnel={personnel} />
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
