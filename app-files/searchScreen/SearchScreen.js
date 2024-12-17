import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useState } from "react";
import { fetchGifs } from "./searchApi";
import SearchBar from "./SearchBar";
import GifItem from "../homeScreen/GifItem";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

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
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 70);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 70],
    outputRange: [0, -70],
    extrapolate: "clamp",
  });
  const { t } = useTranslation();

  const handleSearch = () => {
    if (searchText !== "") {
      setPage(0);
      setGifs([]); // Clear previous search results
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
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          zIndex: 100,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
        }}
      >
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={handleSearch}
        />
      </Animated.View>
      {noResults ? (
        <Text style={styles.noResults}>{t("No results found")}</Text>
      ) : (
        <Animated.FlatList
          bounces={false}
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
              screenType="SearchScreen"
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
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
    marginTop: 70,
    textAlign: "center",
    fontSize: 18,
    color: "#333",
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 70,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
