import React, { Component } from "react";

import { View, TouchableOpacity, Platform, Keyboard, Text } from "react-native";

const styles = {
  tabbarView: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 50,
    opacity: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  iconView: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  hidden: {
    height: 0
  }
};

class Tab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyboardUp: false
    };
  }

  componentWillMount() {
    if (Platform.OS === "android") {
      this.keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        this.keyboardWillShow.bind(this)
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        this.keyboardWillHide.bind(this)
      );
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onSelect(el) {
    if (el.props.onSelect) {
      el.props.onSelect(el);
    } else if (this.props.onSelect) {
      this.props.onSelect(el);
    }
  }

  keyboardWillHide() {
    this.setState({ keyboardUp: false });
  }

  keyboardWillShow() {
    this.setState({ keyboardUp: true });
  }

  render() {
    let selected = this.props.selected;
    if (!selected) {
      React.Children.forEach(this.props.children.filter(c => c), el => {
        if (!selected || el.props.initial) {
          selected = el.props.name || el.key;
        }
      });
    }

    return (
      <View
        style={[
          styles.tabbarView,
          this.props.style,
          this.state.keyboardUp && styles.hidden
        ]}
      >
        {React.Children.map(this.props.children.filter(c => c), el =>
          <TouchableOpacity
            key={`${el.props.name}touch`}
            testID={el.props.testID}
            style={[
              styles.iconView,
              this.props.iconStyle,
              (el.props.name || el.key) === selected
                ? this.props.selectedIconStyle ||
                    el.props.selectedIconStyle ||
                    {}
                : {}
            ]}
            onPress={() => !this.props.locked && this.onSelect(el)}
            onLongPress={() => this.onSelect(el)}
            activeOpacity={el.props.pressOpacity}
          >
            {selected === (el.props.name || el.key)
              ? React.cloneElement(el, {
                  selected: true,
                  style: [
                    el.props.style,
                    this.props.selectedStyle,
                    el.props.selectedStyle
                  ]
                })
              : el}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default Tab;
