import styled from "styled-components";
import React from "react";
import { getBase64 } from "../../utils/helper";
import FileDrop from "react-file-drop";

const Dropbox = styled.div`
  background-color: red;
  width: 100%;
  height: 100%;
`;
const FileDropper = styled(FileDrop)`
  z-index: 10000;
`;

class AddImageDropFile extends React.Component {
  handleDrop = (files, event) => {
    console.log(files, event);
  };

  render() {
    return (
      <Dropbox>
        <FileDropper onDrop={this.handleDrop}>drop image file here</FileDropper>
      </Dropbox>
    );
  }
}

export default AddImageDropFile;
