import Link from "next/link";
import Page from "../components/page";
import Layout from "../layouts/layout";
import styled from "styled-components";
import { Container, Form } from "semantic-ui-react";
import { API, API_credential } from "../utils/API";
import Router from "next/router";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const Limiter = styled.div`
  width: 50vw;
  height: 50vh;
  align-self: center;
  justify-self: center;
`;

const WrapperForm = styled.div`
  margin-top: 3vh;
`;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: "secretary",
      id: "123",
      password: "password",
      tab_selected: 0
    };
  }

  handleTabSelected = (e, value) => {
    this.setState({ tab_selected: value });
  };

  handleUsername = e => {
    this.setState({ id: e.target.value });
  };
  handlePassword = e => {
    this.setState({ password: e.target.value });
  };
  handleSecretaryButtonClick = async () => {
    const { id, password } = this.state;
    var bodyFormData = new FormData();
    bodyFormData.set("uid", id);
    bodyFormData.append("password", password);
    await API_credential.post("/login", bodyFormData).then(response => {
      console.log(response);
      if (response.data == "successful") {
        Router.push("/menu");
      }
    });
  };
  // test = async () => {
  //   await API_credential.get("/test_login").then(response =>
  //     console.log(response)
  //   );
  // };

  render() {
    const { tab_selected } = this.state;
    return (
      <Limiter className="limiter">
        <Container>
          <Tabs value={tab_selected} onChange={this.handleTabSelected}>
            <Tab label="Secretary" />
            <Tab label="Administrator" />
          </Tabs>
          <WrapperForm>
            <Form>
              <Form.Input
                fluid
                label="Username"
                placeholder="Username"
                onChange={this.handleUsername}
              />
              <Form.Input
                fluid
                label="Password"
                placeholder="Password"
                type="password"
                onChange={this.handlePassword}
              />
              <Form.Button onClick={this.handleSecretaryButtonClick}>
                Login
              </Form.Button>
            </Form>
          </WrapperForm>
        </Container>
      </Limiter>
    );
  }
}

const LoginWrapper = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  align-content: center;
  justify-content: center;
`;

const Index = () => (
  <div className="index-page">
    <Layout is_login_page>
      <LoginWrapper className="login-wrapper">
        <Login />
      </LoginWrapper>
    </Layout>
  </div>
);

export default Page(Index);
