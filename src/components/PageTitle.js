import React from "react";
import { Text, View } from "react-native";
import { white, primary } from "../util/colors";

const PageTitle = ({ title }) => {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: primary,
        height: 85
      }}
    >
      <Text
        style={{
          color: white,
          fontWeight: "bold",
          fontSize: 25,
          marginTop: 20
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default PageTitle;
