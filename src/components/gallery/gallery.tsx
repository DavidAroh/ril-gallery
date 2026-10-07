"use client";

import { useEffect, useState } from "react";
import { albums } from "@/data/albums";
import { Icon } from "@/components/ui/icon";
import { Photo } from "./photo";
import { PhotoViewer } from "./photo-viewer";
import type { PhotoSelection } from "./types";

export function Gallery() {
  const [selection, setSelection] = useState<PhotoSelection | null>(null);
  const [activeAlbum, setActiveAlbum] = useState("miws");
  const [loading, setLoading] = useState(false);
  const selectedAlbum = selection ? albums[selection.albumIndex] : null;

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
    setLoading(true);
    setSelection({ albumIndex, photoIndex });
  }
  function movePhoto(step: number) {
    if (!selection || !selectedAlbum) return;
    setLoading(true);
    setSelection({
      ...selection,
      photoIndex:
        (selection.photoIndex + step + selectedAlbum.photos.length) %
        selectedAlbum.photos.length,
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
              <Icon name="folder" />
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
          {albums.map((album, albumIndex) => (
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
                  <a
                    href={`https://drive.google.com/drive/folders/${album.folder}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open original album
                  </a>
                </div>
              </div>
              {album.photos.length ? (
                <div className="photo-grid">
                  {album.photos.map((photo, photoIndex) => (
                    <figure className="photo-figure" key={photo.file}>
                      <button
                        className="photo-button"
                        key={photo.file}
                        onClick={() => openPhoto(albumIndex, photoIndex)}
                        aria-label={`View ${album.name} photograph ${photoIndex + 1}`}
                      >
                        <Photo
                          file={photo.file}
                          alt={photo.alt}
                          sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 600px"
                        />
                        <span className="photo-open" aria-hidden="true">
                          <Icon name="expand" />
                        </span>
                      </button>
                      <figcaption>{photo.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <p className="empty-album">No photos in this album yet.</p>
              )}
            </section>
          ))}
        </div>
      </section>
      <PhotoViewer
        selection={selection}
        loading={loading}
        onClose={() => setSelection(null)}
        onMove={movePhoto}
        onSelect={openPhoto}
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
