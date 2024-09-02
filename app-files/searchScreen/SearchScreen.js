import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { fetchGifs } from "./searchApi";
import SearchBar from "./SearchBar";
import GifItem from "../homeScreen/GifItem";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [gifs, setGifs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [noResults, setNoResults] = useState(false);
  const navigation = useNavigation();
  const favorites = useSelector((state) => state.favorites.favoriteGifs);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchText !== "") {
      setPage(0); // Reset page number to 0 for a new search
      setGifs([]); // Clear the existing GIFs
      setHasMore(true);
      setLoading(true);
      fetchGifs(searchText, setGifs, setNoResults, 0, setLoading, setHasMore);
    }
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

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="black" />;
  };

  const handleOnEndReached = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      setLoading(true);
      fetchGifs(
        searchText,
        setGifs,
        setNoResults,
        nextPage,
        setLoading,
        setHasMore
      );
    }
  };

  return (
    <View style={styles.root}>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={handleSearch}
      />
      {noResults ? (
        <Text style={styles.noResults}>No results found</Text>
      ) : (
        <FlatList
          data={gifs}
          keyExtractor={(item) => item.id}
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
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  noResults: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
    color: "#333",
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
