import axios from "axios";

const API_KEY = "1YG2MuuVW2js3z2DY5VVg1BPb8bSKrfC";

export const fetchGifs = async (
  page,
  setLoading,
  setHasMore,
  setGifs,
  isRefreshing
) => {
  setLoading(true);
  try {
    const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20&offset=${
      page * 20
    }&rating=g&bundle=messaging_non_clips;`;
    const response = await axios.get(API_URL);

    const { data } = response.data;
    if (data.length > 0) {
      const formattedGifs = data.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.images?.fixed_height_downsampled.url,
        description: item.user?.description,
        url: item.url,
        slug: item.slug,
        type: item.type,
      }));
      setGifs((currGifs) =>
        isRefreshing ? formattedGifs : [...currGifs, ...formattedGifs]
      );
    } else {
      setHasMore(false);
    }
  } catch (error) {
    console.error("Error fetching GIFs:", error);
  } finally {
    setLoading(false);
  }
};
