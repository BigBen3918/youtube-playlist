const API_KEY = "XXXXXXXXXXXXXXXXXXXXXX";
const PLAYLIST_ID = "PLs1-UdHIwbo5fx0MbqyoEG5qDqzZjK9WC";

export async function getPlaylist() {
  const request = await fetch(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
  ).then((res) => {
    if (!res.ok) {
      console.log(res.statusText);
      console.log(API_KEY);
      throw new Error("Failed to fetch data");
    }
    const data = res.json();
    return data;
  });
  return request.items;
}
