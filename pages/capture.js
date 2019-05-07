import Layout from "../layouts/layout";
import styled from "styled-components";
import React from "react";
import { API_credential } from "../utils/API";
import Router from "next/router";

class Capture extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {} = this.state;
    return <Layout />;
  }
}

export default Capture;
