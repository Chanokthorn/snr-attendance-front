import Header from "../components/header";
import { API_credential } from "../utils/API";
import React from "react";
import styled from "styled-components";

const Content = styled.div`
  width: 100vw;
  height: 90vh;
`;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.is_login_page) {
      this.state = {
        logged_in: false,
        loaded: true,
        is_login_page: this.props.is_login_page
      };
    } else {
      this.state = {
        logged_in: false,
        loaded: false
      };
    }
  }

  async componentDidMount() {
    await API_credential.get("/test_login").then(response => {
      if (response.data == "success") {
        this.setState({ logged_in: true }, () => {
          this.setState({ loaded: true });
        });
      }
    });
  }

  render() {
    const { logged_in, loaded, is_login_page } = this.state;
    return (
      <div className="layout">
        {!loaded ? null : !logged_in && !is_login_page ? (
          <div>
            <div className="header">
              <Header logged_in={logged_in} />
            </div>
            user is not logged in
          </div>
        ) : (
          <div>
            <div className="header">
              <Header logged_in={logged_in} />
            </div>
            <Content>{this.props.children}</Content>

            <style jsx>{`
              .header {
                height: 10vw;
              }
              .layout {
                font-family: Verdana, Geneva, sans-serif;
                height: 100vh;
              }
            `}</style>
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
