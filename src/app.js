import React, { Component } from "react";
import { Provider } from "react-redux";

import Home from "./router";
import configureStore from "./store";

const store = module.hot && module.hot.data && module.hot.data.store
  ? module.hot.data.store
  : configureStore();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      store: module.hot && module.hot.data && module.hot.data.store
        ? module.hot.data.store
        : configureStore(() => {
            this.setState({ isLoading: false });
          })
    };
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <Provider store={this.state.store}>
        <Home />
      </Provider>
    );
  }
}

export default App;
