"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { albums } from "@/data/albums";
import { Icon } from "@/components/ui/icon";
import { Photo } from "./photo";
import type { PhotoSelection } from "./types";

type PhotoViewerProps = {
  selection: PhotoSelection | null;
  loading: boolean;
  onClose: () => void;
  onMove: (step: number) => void;
  onSelect: (albumIndex: number, photoIndex: number) => void;
  onLoad: () => void;
};

export function PhotoViewer({
  selection,
  loading,
  onClose,
  onMove,
  onSelect,
  onLoad,
}: PhotoViewerProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const album = selection ? albums[selection.albumIndex] : null;
  const photo = selection && album ? album.photos[selection.photoIndex] : null;

  useEffect(() => {
    const node = dialog.current;
    if (selection && node && !node.open) node.showModal();
    if (!selection && node?.open) node.close();
  }, [selection]);

  return (
    <dialog
      className="photo-viewer"
      ref={dialog}
      aria-labelledby="viewer-title"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          onMove(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          onMove(1);
        }
      }}
    >
      <div className="viewer-header">
        <div>
          <h2 id="viewer-title">{album?.name || "Photo viewer"}</h2>
          <p className="viewer-counter" aria-live="polite">
            {selection && album
              ? `${selection.photoIndex + 1} of ${album.photos.length}`
              : ""}
          </p>
        </div>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="viewer-stage">
        <button
          className="icon-button viewer-previous"
          onClick={() => onMove(-1)}
          aria-label="Previous photo"
        >
          <Icon name="previous" />
        </button>
        <div className="viewer-image" aria-busy={loading}>
          {photo && (
            <Photo
              key={photo.file}
              file={photo.file}
              alt={photo.alt}
              sizes="90vw"
              priority
              onLoad={onLoad}
            />
          )}
          {loading && <span className="image-loading" aria-hidden="true" />}
        </div>
        <button
          className="icon-button viewer-next"
          onClick={() => onMove(1)}
          aria-label="Next photo"
        >
          <Icon name="next" />
        </button>
      </div>
      <div className="viewer-footer">
        <p>{photo?.alt}</p>
        <div className="viewer-thumbnails" aria-label="Album photographs">
          {album?.photos.map((thumbnail, index) => (
            <button
              key={thumbnail.file}
              aria-label={`Show photograph ${index + 1}`}
              aria-pressed={selection?.photoIndex === index}
              onClick={() => selection && onSelect(selection.albumIndex, index)}
            >
              <Image
                src={`/assets/${thumbnail.file}.webp`}
                alt=""
                fill
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>
    </dialog>
  );
}
