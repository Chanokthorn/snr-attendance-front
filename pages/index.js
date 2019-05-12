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
      username: "boneAdmin",
      password: "senior",
      tab_selected: 0 // 0: secretary, 1: admin
    };
  }

  handleTabSelected = (e, value) => {
    this.setState({ tab_selected: value });
  };

  handleUsername = e => {
    this.setState({ username: e.target.value });
  };
  handlePassword = e => {
    this.setState({ password: e.target.value });
  };
  handleLoginButtonClick = async () => {
    const { username, password, tab_selected } = this.state;
    var bodyFormData = new FormData();
    bodyFormData.set("username", username);
    bodyFormData.append("password", password);
    bodyFormData.append("mode", tab_selected);
    await API_credential.post("/login", bodyFormData).then(response => {
      console.log(response);
      if (response.data == "successful") {
        if (tab_selected === 0) {
          Router.push("/menu");
        } else {
          Router.push("/adminMenu");
        }
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
              <Form.Button onClick={this.handleLoginButtonClick}>
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
