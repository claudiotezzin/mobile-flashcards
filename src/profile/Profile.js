import React, { Component } from "react";
import { View, Text } from "react-native";
import PageTitle from "../common/components/PageTitle";

class Profile extends Component {
  render() {
    return (
      <View>
        <PageTitle title={"Profile"} />
        <Text>Profile</Text>
      </View>
    );
  }
}

export default Profile;
