import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import RemoveAllFavorite from "./RemoveAllFavorite";
import IconButton from "./IconButton";
import { useTranslation } from "react-i18next";

const screenWidth = Dimensions.get("window").width;
const itemMargin = 10;
const numColumns = 2;
const itemWidth = (screenWidth - (numColumns + 1) * itemMargin) / numColumns;

function FavoriteScreen() {
  const favorites = useSelector((state) => state.favorites.favoriteGifs);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const pressHandler = (item) => {
    navigation.navigate("Details", {
      itemId: item.id,
      title: item.title,
      image: item.image,
      description: item.description,
      type: item.type,
      slug: item.slug,
      url: item.url,
    });
  };

  return (
    <View style={styles.root}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyMessage}>{t("No favorites yet.")}</Text>
      ) : (
        <>
          <FlatList
            contentContainerStyle={{ paddingBottom: 10 }}
            data={favorites}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => (
              <Pressable
                style={styles.itemContainer}
                onPress={() => pressHandler(item)}
              >
                <View style={styles.iconContainer}>
                  <Pressable
                    onPress={() =>
                      dispatch({
                        type: "REMOVE_FROM_FAVORITE",
                        payload: item.id,
                      })
                    }
                  >
                    <IconButton isPressed={true} />
                  </Pressable>
                </View>

                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.description}>
                  {item.description
                    ? item.description
                    : "No description available"}
                </Text>
              </Pressable>
            )}
          />

          <RemoveAllFavorite />
        </>
      )}
    </View>
  );
}

export default FavoriteScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  emptyMessage: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  itemContainer: {
    backgroundColor: "white",
    marginBottom: itemMargin,
    width: itemWidth,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    top: 10,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    color: "#666",
    paddingHorizontal: 10,
    textAlign: "center",
    paddingBottom: 12,
  },
  iconContainer: {
    position: "absolute",
    left: 8,
    zIndex: 10,
  },
});
