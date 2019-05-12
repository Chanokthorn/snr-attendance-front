import Layout from "../layouts/layout";
import styled from "styled-components";
import React from "react";
import { API_credential, API } from "../utils/API";
import { isArray } from "../utils/helper";

import IncomingMenu from "../components/menu/incomingMenu";
import HistoryMenu from "../components/menu/historyMenu";

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

class Menu extends React.Component {
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
      <Layout>
        <MenuWrapperContainer className="menu-wrapper-container">
          <Tabs
            value={tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Incoming" />
            <Tab label="History" />
          </Tabs>
          <MenuWrapper className="menu-wrapper">
            <TabContainer>
              <IncomingMenu show={tab === 0} />
              <HistoryMenu show={tab === 1} />
            </TabContainer>
          </MenuWrapper>
        </MenuWrapperContainer>
      </Layout>
    );
  }
}

export default Menu;

// Menu.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// const MenuWrapped = withStyles(styles)(Menu);

// export default MenuWrapped;
