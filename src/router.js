import React, { Component } from "react";
import { Navigator } from "react-native";
import { connect } from "react-redux";

import Home from "./components/Home";
import Single from "./components/Single";

class RouterComponent extends Component {
  configureScene() {
    if (typeof this.props.transition === "function") {
      return Navigator.SceneConfigs[this.props.transition()];
    }

    return Navigator.SceneConfigs[this.props.transition];
  }

  renderScene(route, navigator) {
    switch (route.id) {
      case "home":
      default:
        return <Home navigator={navigator} route={route} />;
      case "single":
        return <Single navigator={navigator} route={route} />;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ id: "home" }}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

const mapStateToProps = state => {
  const { transition } = state.settings;

  return { transition };
};

export default connect(mapStateToProps, {})(RouterComponent);
