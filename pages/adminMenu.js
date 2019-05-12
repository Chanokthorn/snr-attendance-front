import Layout from "../layouts/layout";
import styled from "styled-components";
import React from "react";
import { API_credential, API } from "../utils/API";
import { isArray } from "../utils/helper";

import AdminPersonMenu from "../components/adminMenu/adminPersonMenu";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const MenuWrapperContainer = styled.div`
  background-color: green;
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column
  justify-content: center;
  align-items: center;
`;

const MenuWrapper = styled.div`
  background-color: orange;
  width: 70%;
  height: 70%;
  display: grid;
`;

const TabContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class AdminMenu extends React.Component {
  constructor() {
    super();
    this.state = { tab: 0 };
  }

  handleTabChange = (e, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { tab } = this.state;
    return (
      <Layout page_role="admin">
        <MenuWrapperContainer className="menu-wrapper-container">
          <Tabs
            value={tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Personnel" />
            <Tab label="Committee" />
          </Tabs>
          <MenuWrapper className="menu-wrapper">
            <TabContainer>
              <AdminPersonMenu show={tab === 0} />
              {/* <IncomingMenu show={tab === 0} />
              <HistoryMenu show={tab === 1} /> */}
            </TabContainer>
          </MenuWrapper>
        </MenuWrapperContainer>
      </Layout>
    );
  }
}

export default AdminMenu;
