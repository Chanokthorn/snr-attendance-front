import Link from "next/link";
import Page from "../components/page";
import Layout from "../layouts/layout";
import styled from "styled-components";
import { Button, Container, Tab, Form } from "semantic-ui-react";
import { API, API_credential } from "../utils/API";
import Router from "next/router";

const Limiter = styled.div`
  width: 50vw;
  height: 50vh;
  align-self: center;
  justify-self: center;
`;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: "secretary",
      s_id: "",
      s_password: ""
    };
  }

  handleSecretaryUsername = e => {
    this.setState({ s_id: e.target.value });
  };
  handleSecretaryPassword = e => {
    this.setState({ s_password: e.target.value });
  };
  handleSecretaryButtonClick = async () => {
    const { s_id, s_password } = this.state;
    await API_credential.get("/login", {
      params: {
        uid: s_id,
        password: s_password
      }
    }).then(response => {
      console.log(response);
      if (response.data == "successful") {
        Router.push("/menu");
      }
    });
  };
  test = async () => {
    await API_credential.get("/test_login").then(response =>
      console.log(response)
    );
  };

  render() {
    return (
      <Limiter className="limiter">
        <Container>
          <Form>
            <Form.Input
              fluid
              label="Username"
              placeholder="Username"
              onChange={this.handleSecretaryUsername}
            />
            <Form.Input
              fluid
              label="Password"
              placeholder="Password"
              type="password"
              onChange={this.handleSecretaryPassword}
            />
            <Form.Button onClick={this.handleSecretaryButtonClick}>
              Login
            </Form.Button>
            <Form.Button onClick={this.test}>Test</Form.Button>
          </Form>
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
