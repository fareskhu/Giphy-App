import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import GifItem from "./GifItem";
import { fetchGifs } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";

const HomeScreen = () => {
  const [gifs, setGifs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const favorites = useSelector((state) => state.favorites.favoriteGifs);

  useEffect(() => {
    fetchGifs(page, setLoading, setHasMore, setGifs);
  }, [page]);

  const handleOnEndReached = () => {
    if (!loading && hasMore) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(0);
    setHasMore(true);
    await fetchGifs(0, setLoading, setHasMore, setGifs, setRefreshing);
    setRefreshing(false);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="black" />;
  };

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

  const toggleFavorite = (item) => {
    const isFavorite = favorites.some(
      (favoriteItem) => favoriteItem.id === item.id
    );

    if (isFavorite) {
      dispatch({ type: "REMOVE_FROM_FAVORITE", payload: item.id });
    } else {
      dispatch({ type: "ADD_TO_FAVORITE", payload: item });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={gifs}
        contentContainerStyle={{
          gap: 10,
          padding: 10,
        }}
        columnWrapperStyle={{
          gap: 10,
        }}
        renderItem={({ item }) => (
          <GifItem
            item={item}
            isFavorite={favorites.some(
              (favoriteItem) => favoriteItem.id === item.id
            )}
            toggleFavorite={toggleFavorite}
            pressHandler={pressHandler}
            screenType="HomeScreen" // Pass the screen type here
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
