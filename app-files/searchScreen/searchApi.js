import axios from "axios";

const API_KEY = "1YG2MuuVW2js3z2DY5VVg1BPb8bSKrfC";

export const fetchGifs = async (
  searchTerm,
  setGifs,
  setNoResults,
  page,
  setLoading,
  setHasMore
) => {
  try {
    const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=20&offset=${
      page * 20
    }&rating=g&lang=en&bundle=messaging_non_clips`;

    const response = await axios.get(API_URL);

    const { data } = response.data;
    if (data.length === 0) {
      setNoResults(true);
      setHasMore(false);
    } else {
      const searchedGifs = data.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.images?.fixed_height_downsampled.url,
        description: item.user?.description,
        url: item.url,
        slug: item.slug,
        type: item.type,
      }));
      setGifs((prevGifs) => [...prevGifs, ...searchedGifs]); // Append new data to existing
      setNoResults(false);
      if (data.length < 20) {
        setHasMore(false); // No more data to fetch
      }
    }
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    setNoResults(true);
  } finally {
    setLoading(false);
  }
};
