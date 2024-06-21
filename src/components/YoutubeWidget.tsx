import { useEffect, useState } from "react";
import { getPlaylist } from "../api";

type YoutubeType = {
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  };
  snippet: {
    title: string;
    publishedAt: string;
    playlistId: string;
  };
};

const iframeStyle = {
  borderRadius: "10px",
  border: 0,
  backgroundColor: "#eeeeee",
  aspectRatio: "16/9",
};

export default function YoutubeWidget() {
  const [data, setData] = useState<YoutubeType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const videos = await getPlaylist();
        setData(videos);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading video</div>;
  const videos = data?.map((video) => video);

  return (
    <>
      {videos?.map((video) => (
        <iframe
          key={video.contentDetails.videoId}
          width="100%"
          height="100%"
          src={`https://youtube.com/embed/${video.contentDetails.videoId}?list=${video.snippet.playlistId}`}
          title={video.snippet.title}
          style={iframeStyle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        ></iframe>
      ))}
    </>
  );
}
