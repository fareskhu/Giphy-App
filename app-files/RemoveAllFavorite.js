import { Button } from "react-native";
import { useDispatch } from "react-redux";

const RemoveAllFromFavorite = () => {
  const dispatch = useDispatch();

  const removeFavorites = () => {
    dispatch({ type: "REMOVE_ALL_FROM_FAVORITE" });
  };
  return <Button title="Remove All" onPress={removeFavorites} />;
};
export default RemoveAllFromFavorite;
