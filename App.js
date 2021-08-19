import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Message from "./Message";

export default function App() {
  const [data, setData] = useState([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("http://41.212.84.221/");
      const json = await response.json();
      await setData(json);
    })();
  }, []);

  const sendMessage = async () => {
    const mew = {
      name: "Duncan Kipkemoi",
      content: chat,
    };
    await fetch("http://41.212.84.221/", {
      body: JSON.stringify(mew),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async () => {
      await setChat("");
      const response = await fetch("http://41.212.84.221/");
      const json = await response.json();
      await setData(json);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <FlatList
        data={data}
        inverted={true}
        style={{
          marginBottom: 50
        }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Message
            username={item.name}
            time={item.createdAt}
            message={item.content}
          />
        )}
      />
      <View
        style={{
          backgroundColor: "#ededed",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 10,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          paddingVertical: 5
        }}
      >
        <TextInput
          placeholder="Enter a message here..."
          placeholderTextColor="#FFF"
          value={chat}
          onChangeText={(text) => setChat(text)}
          style={{
            backgroundColor: "gray",
            borderRadius: 15,
            paddingHorizontal: 10,
            paddingVertical: 7,
            flex: 1,
            color: "#FFF",
          }}
        />
        <TouchableOpacity disabled={!chat} onPress={sendMessage}>
          <Ionicons
            style={{
              marginLeft: 20,
              marginRight: 10,
            }}
            name="send"
            size={24}
            color={chat ? "blue" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
