import Header from "../components/header";
import { API_credential } from "../utils/API";
import React from "react";
import styled from "styled-components";

const Content = styled.div`
  width: 100vw;
  height: 90vh;
`;

const HeaderLimit = styled.div`
  width: 100vw;
  height: 10vh;
`;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    if (props.is_login_page) {
      this.state = {
        logged_in: false,
        loaded: true,
        username: "",
        role: "",
        page_role: props.page_role,
        is_login_page: props.is_login_page
      };
    } else {
      this.state = {
        logged_in: false,
        loaded: false,
        username: "",
        role: "",
        page_role: props.page_role
      };
    }
  }

  async componentDidMount() {
    await API_credential.get("/test_login").then(res => {
      // console.log(res);
      if (res.data != "unauthorized") {
        this.setState(
          { logged_in: true, username: res.data.username, role: res.data.role },
          () => {
            this.setState({ loaded: true });
          }
        );
      }
    });
  }

  render() {
    const {
      logged_in,
      loaded,
      is_login_page,
      username,
      role,
      page_role
    } = this.state;
    return (
      <div className="layout">
        {!loaded ? null : !logged_in && !is_login_page ? (
          <div>
            <div className="header">
              <Header logged_in={logged_in} />
            </div>
            user is not logged in
          </div>
        ) : page_role != role && !is_login_page ? (
          <div>insufficient role</div>
        ) : (
          <div>
            <HeaderLimit className="header">
              <Header logged_in={logged_in} username={username} role={role} />
            </HeaderLimit>
            <Content>{this.props.children}</Content>
          </div>
        )}
      </div>
    );
  }
}

// const Layout = props => {
//   console.log(props);

//   return (
//     <div className="layout">
//       <div className="header">
//         <Header />
//       </div>
//       {props.children}
//       <style jsx>{`
//         .header {
//           height: 10vw;
//         }
//         .layout {
//           font-family: Verdana, Geneva, sans-serif;
//           height: 100vh;
//         }
//       `}</style>
//     </div>
//   );
// };

export default Layout;
