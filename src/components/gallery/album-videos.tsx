import { albumVideos } from "@/data/videos";

export function AlbumVideos({ albumId }: { albumId: string }) {
  const videos = albumVideos[albumId];
  if (!videos?.length) return null;

  return (
    <section className="album-videos" aria-labelledby={`${albumId}-videos-title`}>
      <h4 id={`${albumId}-videos-title`}>Videos</h4>
      <div className="video-grid">
        {videos.map((video) => (
          <figure key={video.id}>
            <iframe
              src={`https://streamable.com/e/${video.id}`}
              title={`${video.title} video`}
              loading="lazy"
              allow="fullscreen; picture-in-picture"
              allowFullScreen
            />
            <figcaption>{video.title}</figcaption>
            <a
              href={`https://streamable.com/${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on Streamable
            </a>
          </figure>
        ))}
      </div>
    </section>
  );
}
