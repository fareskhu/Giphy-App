import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DetailsHeader from "./DetailsHeader";
import DetailsImage from "./DetailsImage";
import DetailsInfo from "./DetailsInfo";

const DetailsScreen = ({ route }) => {
  const { itemId, title, image, description, slug, type, url } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favoriteGifs);

  const isFavorite = favorites.some((item) => item.id === itemId);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FROM_FAVORITE", payload: itemId });
    } else {
      dispatch({
        type: "ADD_TO_FAVORITE",
        payload: { id: itemId, title, image, description, slug, type, url },
      });
    }
  };

  return (
    <View style={styles.container}>
      <DetailsHeader title={title} />
      <DetailsImage
        image={image}
        url={url}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
      <DetailsInfo description={description} slug={slug} type={type} />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
});
