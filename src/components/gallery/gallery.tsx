"use client";

import { Fragment, useEffect, useState } from "react";
import { albums } from "@/data/albums";
import photoDimensions from "@/data/photo-dimensions.json";
import { Icon } from "@/components/ui/icon";
import { AlbumVideo } from "./album-videos";
import { albumVideos } from "@/data/videos";
import { Photo } from "./photo";
import { PhotoViewer } from "./photo-viewer";
import type { PhotoSelection } from "./types";

const dimensions: Record<string, number[]> = photoDimensions;

export function Gallery() {
  const [selection, setSelection] = useState<PhotoSelection | null>(null);
  const [activeAlbum, setActiveAlbum] = useState("miws");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(
    {},
  );
  const selectedAlbum = selection ? albums[selection.albumIndex] : null;
  const photoIndices = selectedAlbum
    ? selectedAlbum.photos
        .map((photo, index) => ({ photo, index }))
        .filter(
          ({ photo }) =>
            !filters[selectedAlbum.id] ||
            photo.collection === filters[selectedAlbum.id],
        )
        .map(({ index }) => index)
    : [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveAlbum(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -65% 0px" },
    );
    albums.forEach((album) => {
      const section = document.getElementById(album.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  function openPhoto(albumIndex: number, photoIndex: number) {
    const album = albums[albumIndex];
    if (
      filters[album.id] &&
      album.photos[photoIndex].collection !== filters[album.id]
    )
      setFilters({ ...filters, [album.id]: "" });
    setLoading(true);
    setSelection({ albumIndex, photoIndex });
  }
  function movePhoto(step: number) {
    if (!selection || !selectedAlbum) return;
    setLoading(true);
    setSelection({
      ...selection,
      photoIndex:
        photoIndices[
          (photoIndices.indexOf(selection.photoIndex) +
            step +
            photoIndices.length) %
            photoIndices.length
        ],
    });
  }

  return (
    <>
      <section className="photo-cover" aria-labelledby="intro-title">
        <button
          className="cover-image"
          onClick={() => openPhoto(0, 0)}
          aria-label="View the featured MIWS photograph"
        >
          <Photo
            file="miws-1"
            alt={albums[0].photos[0].alt}
            sizes="100vw"
            priority
          />
          <span className="cover-action">
            <Icon name="expand" /> View photograph
          </span>
        </button>
        <div className="cover-caption page-width">
          <span>MIWS</span>
          <span>Port Harcourt, Nigeria</span>
        </div>
        <div className="cover-intro page-width">
          <h1 id="intro-title">Life at RIL.</h1>
          <div>
            <p>
              The people, the ideas, the moments in between.
              <br />
              Our community, seen up close.
            </p>
            <a className="text-link" href="#collections">
              Explore the albums <Icon name="down" />
            </a>
          </div>
        </div>
      </section>
      <section
        className="collections"
        id="collections"
        aria-labelledby="collections-title"
      >
        <h2 className="sr-only" id="collections-title">
          Community albums
        </h2>
        <nav className="album-nav" aria-label="Photo albums">
          {albums.map((album) => (
            <a
              key={album.id}
              href={`#${album.id}`}
              aria-current={activeAlbum === album.id ? "location" : undefined}
              onClick={() => setActiveAlbum(album.id)}
            >
              <span>{album.name}</span>
              <span
                className="album-count"
                aria-label={`${album.photos.length} photographs`}
              >
                {album.photos.length}
              </span>
            </a>
          ))}
        </nav>
        <div className="album-spreads page-width">
          {albums.map((album, albumIndex) => {
            const filteredPhotos = album.photos
              .map((photo, index) => ({ photo, index }))
              .filter(
                ({ photo }) =>
                  !filters[album.id] || photo.collection === filters[album.id],
              );
            const visibleCount = visibleCounts[album.id] || 6;
            return (
              <section
                className={`album album-${album.id}`}
                id={album.id}
                key={album.id}
                aria-labelledby={`${album.id}-title`}
              >
                <div className="album-heading">
                  <h3 id={`${album.id}-title`}>{album.name}</h3>
                  <div className="album-details">
                    <span>{album.photos.length} photographs</span>
                    <details className="source-links">
                      <summary>Original collections</summary>
                      <div>
                        {album.collections.map((collection) => (
                          <a
                            href={collection.source}
                            key={collection.id}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {collection.label}
                          </a>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>
                <div
                  className="collection-filters"
                  role="group"
                  aria-label={`${album.name} collections`}
                >
                  <button
                    aria-pressed={!filters[album.id]}
                    onClick={() => {
                      setFilters({ ...filters, [album.id]: "" });
                      setVisibleCounts({ ...visibleCounts, [album.id]: 6 });
                    }}
                  >
                    {albumVideos[album.id]?.length ? "All photos & videos" : "All photos"}
                  </button>
                  {album.collections
                    .filter((collection) =>
                      album.photos.some(
                        (photo) => photo.collection === collection.id,
                      ),
                    )
                    .map((collection) => (
                      <button
                        key={collection.id}
                        aria-pressed={filters[album.id] === collection.id}
                        onClick={() => {
                          setFilters({ ...filters, [album.id]: collection.id });
                          setVisibleCounts({ ...visibleCounts, [album.id]: 6 });
                        }}
                      >
                        {collection.label}
                      </button>
                    ))}
                </div>
                {filteredPhotos.length ? (
                  <div className="photo-grid">
                    {filteredPhotos
                      .slice(0, visibleCount)
                      .map(({ photo, index: photoIndex }, position) => (
                        <Fragment key={photo.file}>
                          <figure className="photo-figure" key={photo.file}>
                            <button
                              className="photo-button"
                              style={{ aspectRatio: dimensions[photo.file].join(" / ") }}
                              key={photo.file}
                              onClick={() => openPhoto(albumIndex, photoIndex)}
                              aria-label={`View ${album.name} photograph ${photoIndex + 1}`}
                            >
                              <Photo
                                thumbnail={photoIndex !== filteredPhotos[0].index}
                                file={photo.file}
                                alt={photo.alt}
                                sizes="(max-width: 640px) 45vw, (max-width: 1000px) 45vw, 420px"
                              />
                              <span className="photo-open" aria-hidden="true">
                                <Icon name="expand" />
                              </span>
                            </button>
                            <figcaption>
                              {photo.alt}
                            </figcaption>
                          </figure>
                          {!filters[album.id] && position % 3 === 0 && albumVideos[album.id]?.[position / 3] && (
                            <AlbumVideo video={albumVideos[album.id][position / 3]} />
                          )}
                        </Fragment>
                      ))}
                  </div>
                ) : (
                  <p className="empty-album">No photos in this album yet.</p>
                )}
                {filteredPhotos.length > visibleCount && (
                  <button
                    className="load-more"
                    onClick={() =>
                      setVisibleCounts({
                        ...visibleCounts,
                        [album.id]: visibleCount + 12,
                      })
                    }
                  >
                    Show more photos{" "}
                    <span>
                      {filteredPhotos.length - visibleCount} remaining
                    </span>
                  </button>
                )}
              </section>
            );
          })}
        </div>
      </section>
      <PhotoViewer
        selection={selection}
        photoIndices={photoIndices}
        loading={loading}
        onClose={() => setSelection(null)}
        onMove={movePhoto}
        onSelect={openPhoto}
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
