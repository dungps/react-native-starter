import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";

const DIMEN = Dimensions.get("window");
const window_width = DIMEN.width;
const window_height = DIMEN.height;

class Single extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changePosition: false,
      marginScroll: 550
    };
  }

  pressToUp() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    if (this.state.changePosition === false) {
      this.setState({
        changePosition: true,
        marginScroll: 350
      });
    } else {
      this.setState({
        changePosition: false,
        marginScroll: 550
      });
    }
  }

  render() {
    const data = this.props.route.data;

    return (
      <View style={{ backgroundColor: "#fff" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: window_width,
            height: window_height
          }}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${data.poster_path}`
            }}
            style={{ width: window_width, height: window_height }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ddd",
            flexDirection: "column",
            flex: 1,
            position: "absolute",
            opacity: 1,
            height: "50%",
            marginTop: this.state.marginScroll
          }}
        >
          <ScrollView>
            <TouchableOpacity onPress={() => this.pressToUp()}>
              <View
                style={{
                  flexDirection: "column",
                  opacity: 1,
                  right: 10,
                  left: 10,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
              >
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    paddingBottom: 5,
                    marginBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ddd"
                  }}
                >
                  {data.original_title}
                </Text>
                <Text>Release Date: {data.release_date}</Text>
                <Text style={{ marginBottom: 10 }}>
                  Vote: {data.vote_average}
                </Text>
                <Text style={{ fontSize: 20 }}>{data.overview}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Single;
