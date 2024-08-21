import { View, Text, StyleSheet } from "react-native";

const DetailsInfo = ({ description, slug, type }) => {
  return (
    <View>
      <Text style={styles.description}>
        {description ? description : "No description available"}
      </Text>
      <Text style={styles.extraDetail}>
        <Text style={styles.extraLabel}>Slug: </Text>
        {slug ? slug : "N/A"}
      </Text>
      <Text style={styles.extraDetail}>
        <Text style={styles.extraLabel}>Type: </Text>
        {type ? type : "N/A"}
      </Text>
    </View>
  );
};

export default DetailsInfo;

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    textAlign: "justify",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  extraDetail: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  extraLabel: {
    fontWeight: "bold",
    color: "#333",
  },
});
