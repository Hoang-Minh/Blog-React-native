import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const BlogPostForm = ({
  onSubmit,
  initialValues = { title: "", content: "" },
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        autoCorrect={false}
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      ></TextInput>
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        autoCorrect={false}
        style={styles.input}
        value={content}
        onChangeText={(text) => setContent(text)}
      ></TextInput>
      <Button
        title="Save Blog Post"
        onPress={() => onSubmit(title, content)}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default BlogPostForm;
