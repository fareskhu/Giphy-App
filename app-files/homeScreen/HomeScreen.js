import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchGifs } from "./api";
import GifItem from "./GifItem";

const HomeScreen = () => {
  const [gifs, setGifs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchGifs(page, setLoading, setHasMore, setGifs);
  }, [page]);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const favorites = useSelector((state) => state.favorites.favoriteGifs);

  const handleOnEndReached = () => {
    if (!loading && hasMore) {
      setPage(page + 1);
    }
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
        numColumns={2}
        data={gifs}
        renderItem={({ item }) => (
          <GifItem
            item={item}
            isFavorite={favorites.some(
              (favoriteItem) => favoriteItem.id === item.id
            )}
            toggleFavorite={toggleFavorite}
            pressHandler={pressHandler}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
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
