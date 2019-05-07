import React from "react";
import { Provider } from "react-redux";
// import store from '../store/store    '

const page = Page => {
  return class PageWrapper extends React.Component {
    render() {
      return (
        <div>
          <Page />
        </div>
      );
    }
  };
};

export default page;
