import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { Entypo } from "@expo/vector-icons";

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const blogPost = state.find(
    (blogPost) => blogPost.id === navigation.getParam("id")
  );

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => {
      return (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() =>
            navigation.navigate("Edit", { id: navigation.getParam("id") })
          }
        >
          <Entypo name="edit" size={30} color="black" />
        </TouchableOpacity>
      );
    },
  };
};

const styles = StyleSheet.create({});

export default ShowScreen;
