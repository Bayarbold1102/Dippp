import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";

import firebase from "firebase";
require("firebase/firestore");
import { connect } from "react-redux";

function Feed(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (
      props.usersLoaded == props.following.length &&
      props.following.length !== 0
    ) {
      props.feed.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(props.feed);
    }
    console.log(posts);
  }, [props.usersLoaded, props.feed]);

  const onLikePress = (userId, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .set({});
  };
  const onDislikePress = (userId, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Text style={styles.container}>
                {"Зурагийг оруулсан : " + item.user.name}
              </Text>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
              {item.currentUserLike ? (
                <Button
                  title="Rate"
                  onPress={() => onLikePress(item.user.uid, item.id)}
                />
              ) : (
                <Button
                  title="Rate"
                  onPress={() => onLikePress(item.user.uid, item.id)}
                />
              )}

              <Text
                onPress={() =>
                  props.navigation.navigate("Comment", {
                    postId: item.id,
                    uid: item.user.uid,
                  })
                }
              >
                Сэтгэгдэлүүд харах...
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  feed: store.usersState.feed,
  usersLoaded: store.usersState.usersLoaded,
});
export default connect(mapStateToProps, null)(Feed);
