import type { GalleryVideo } from "@/data/videos";

export function AlbumVideo({ video }: { video: GalleryVideo }) {
  return (
    <figure className="photo-figure video-figure">
      <iframe
        src={`https://streamable.com/e/${video.id}`}
        title={`${video.title} video`}
        loading="lazy"
        allow="fullscreen; picture-in-picture"
        allowFullScreen
      />
      <figcaption>
        {video.title} · Video
      </figcaption>
    </figure>
  );
}
