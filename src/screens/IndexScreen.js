import React, { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  console.log(navigation);
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

  useEffect(() => {
    getBlogPosts();
  }, []);

  return (
    <View>
      <View>
        <FlatList
          data={state}
          keyExtractor={(blogPost) => blogPost.title}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Show", { id: item.id })}
              >
                <View style={styles.row}>
                  <Text style={styles.title}>
                    {item.title} - {item.id}
                  </Text>
                  <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                    <AntDesign
                      style={styles.icon}
                      name="delete"
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => {
      return (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate("Create")}
        >
          <Entypo name="plus" size={30}></Entypo>
        </TouchableOpacity>
      );
    },
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
