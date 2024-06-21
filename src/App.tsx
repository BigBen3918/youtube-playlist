import YoutubeWidget from "./components/YoutubeWidget";

export default function App() {
  return (
    <main className="container">
      <h1>Youtube Videos</h1>
      <section className="video-container">
        <YoutubeWidget />
      </section>
    </main>
  );
}
