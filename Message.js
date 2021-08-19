import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Message = ({ username, message, time }) => {
  var isoDateTime = new Date(time);
  var localDateTime = isoDateTime.toLocaleDateString() + " " + isoDateTime.toLocaleTimeString()

  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 7,
        backgroundColor: "green",
        width: 200,
        margin: 10,
      }}
    >
      <Text
        style={{
          fontSize: 10,
          color: "black",
        }}
      >
        {username}
      </Text>
      <Text
        style={{
          color: "#FFF",
        }}
      >
        {message}
      </Text>
      <Text
        style={{
          fontSize: 10,
          color: "black",
        }}
      >
        {localDateTime}
      </Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
