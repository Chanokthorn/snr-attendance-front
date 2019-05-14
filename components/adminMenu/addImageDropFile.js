import styled from "styled-components";
import React from "react";
import { getBase64 } from "../../utils/helper";
import { API_credential } from "../../utils/API";

class AddImageDropFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image64: null,
      filename: "uploaded"
    };
  }
  onChange = e => {
    const files = Array.from(e.target.files);
    const file = files[0];
    getBase64(file, image64 => {
      // console.log(image64);
      this.setState({ image64: image64 });
    });
  };
  onClick = async () => {
    const { personnel, onClose } = this.props;
    const { image64 } = this.state;
    var bodyFormData = new FormData();
    bodyFormData.set("image", image64);
    const url = "/recog/personnel/" + personnel.p_id;
    const data = (await API_credential.put(url, bodyFormData)).data;
    if (data == "success") {
      onClose(true);
    }
  };
  render() {
    const { filename, image64 } = this.state;
    return (
      <div>
        <input type="file" id="single" onChange={this.onChange} />
        {filename}
        <button onClick={this.onClick}>GO</button>
      </div>
    );
  }
}

export default AddImageDropFile;
