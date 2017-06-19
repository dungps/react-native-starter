import React, { Component } from "react";
import {
  ListView,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
import { Header, SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";

import Tab from "./Tab";

const ds = new ListView.DataSource({
  sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
  rowHasChanged: (r1, r2) => r1 !== r2
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows([]),
      currentPage: 1,
      isFirstPage: true,
      refreshing: false,
      isLoading: true,
      search: "",
      endpoint: "now_playing"
    };

    this.renderHeader = this.renderHeader.bind(this);
  }

  componentWillMount() {
    this.getLatestData();
  }

  getLatestData() {
    if (this.state.isFirstPage) {
      _postData = [];
    }

    let url = `https://api.themoviedb.org/3/movie/${this.state
      .endpoint}?api_key=e13096ccf21c8b33e43ec169729c57fe&page=${this.state
      .currentPage}`;

    if (this.state.search != "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=e13096ccf21c8b33e43ec169729c57fe&query=${encodeURI(
        this.state.search
      )}&page=${this.state.currentPage}`;
    }

    return fetch(url)
      .then(response => response.json())
      .then(jsonResponse => {
        _postData = this.state.dataSource.cloneWithRows(jsonResponse.results);
        this.setState({
          dataSource: _postData,
          currentPage: this.state.currentPage + 1,
          isFirstPage: false,
          isLoading: false,
          search: ""
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  onEndReached() {
    this.getLatestData();
  }

  onRefresh() {
    this.setState(
      {
        isFirstPage: true,
        dataSource: ds.cloneWithRows([]),
        currentPage: 1,
        refreshing: true
      },
      () => {
        this.getLatestData().then(() => {
          this.setState({
            refreshing: false
          });
        });
      }
    );
  }

  renderHeader() {
    return (
      <View
        style={{
          elevation: 2,
          position: "relative",
          backgroundColor: "#fff",
          height: 60
        }}
      >
        <SearchBar
          round
          placeholder="Search..."
          lightTheme
          onChangeText={text => {
            this.setState(
              {
                search: text,
                currentPage: 1,
                isFirstPage: true
              },
              () => {
                this.getLatestData();
              }
            );
          }}
        />
      </View>
    );
  }

  renderFooter() {
    return (
      <Tab
        selected={this.state.endpoint}
        onSelect={el => {
          this.setState(
            {
              currentPage: 1,
              isFirstPage: true,
              dataSource: ds.cloneWithRows([]),
              endpoint: el.props.name
            },
            () => {
              this.getLatestData();
            }
          );
        }}
        style={{
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          backgroundColor: "#fff"
        }}
        selectedStyle={{ color: "red" }}
      >
        <Text name="now_playing">Now Playing</Text>
        <Text name="top_rated">Top Rated</Text>
      </Tab>
    );
  }

  renderRow(rowData) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigator.push({
            id: "single",
            data: rowData
          });
        }}
        onLongPress={() => {
          this.props.navigator.push({
            id: "single",
            data: rowData
          });
        }}
      >
        <View style={{ height: 200, marginBottom: 10, flexDirection: "row" }}>
          <Image
            indicator={Progress.Circle}
            style={{ flex: 4 }}
            source={{
              uri: `https://image.tmdb.org/t/p/original${rowData.poster_path}`
            }}
          />
          <View style={{ paddingLeft: 10, flex: 6 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
              {rowData.original_title}
            </Text>
            <Text>{rowData.overview.substr(0, 400)}...</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderListView() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.state.dataSource}
        onEndReached={this.onEndReached.bind(this)}
        renderRow={this.renderRow.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
        style={{ backgroundColor: "#fff" }}
      />
    );
  }

  renderLoading() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Progress.Circle size={50} indeterminate />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        {this.state.isLoading ? this.renderLoading() : this.renderListView()}
        {this.renderFooter()}
      </View>
    );
  }
}

export default connect()(Home);
