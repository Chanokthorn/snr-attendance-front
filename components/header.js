import { Button } from "semantic-ui-react";
import { API_credential } from "../utils/API";
import Router from "next/router";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-content; center;
  background-color: gray;
  height: inherit;
`;

const HeaderLabel = styled.div`
  align-self: center;
  justify-self: center;
`;

const HeaderLogoutButton = styled.div`
  align-self: center;
  // justify-self: flex-end;
  margin: 3vh;
`;

const Info = styled.div`
  align-self: flex-end;
  margin: 3vh;
`;

const logout = async () => {
  await API_credential.get("/logout").then(() => {
    Router.push("/index");
  });
};

const Header = props => (
  <HeaderWrapper className="header-wrapper">
    <HeaderLabel>
      <h1>MEETING ATTENDANCE</h1>
    </HeaderLabel>
    {!props.logged_in ? null : (
      <HeaderLogoutButton className="header-logout-button">
        <Button onClick={logout}>Logout</Button>
      </HeaderLogoutButton>
    )}
    {!props.logged_in ? null : (
      <Info>
        User ID: {props.uid} Role: {props.role}
      </Info>
    )}
  </HeaderWrapper>
);

export default Header;
