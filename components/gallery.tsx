'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { albums } from './albums';
import { Icon } from './icons';

function Photo({ file, alt, sizes, priority = false, onLoad }: { file: string; alt: string; sizes: string; priority?: boolean; onLoad?: () => void }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="photo-failure" role="status">This photo couldn't load.<br />Open the original album to view it.</span> : <Image src={`/assets/${file}.webp`} alt={alt} fill sizes={sizes} priority={priority} onLoad={onLoad} onError={() => { setFailed(true); onLoad?.(); }} />;
}

export function Gallery() {
  const [selection, setSelection] = useState<{ albumIndex: number; photoIndex: number } | null>(null);
  const [activeAlbum, setActiveAlbum] = useState('miws');
  const [loading, setLoading] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const selectedAlbum = selection ? albums[selection.albumIndex] : null;
  const selectedPhoto = selection && selectedAlbum ? selectedAlbum.photos[selection.photoIndex] : null;

  useEffect(() => {
    const node = dialog.current;
    if (selection && node && !node.open) node.showModal();
    if (!selection && node?.open) node.close();
  }, [selection]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveAlbum(visible[0].target.id);
    }, { rootMargin: '-10% 0px -65% 0px' });
    albums.forEach(album => { const section = document.getElementById(album.id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  function openPhoto(albumIndex: number, photoIndex: number) { setLoading(true); setSelection({ albumIndex, photoIndex }); }
  function movePhoto(step: number) {
    if (!selection || !selectedAlbum) return;
    setLoading(true);
    setSelection({ ...selection, photoIndex: (selection.photoIndex + step + selectedAlbum.photos.length) % selectedAlbum.photos.length });
  }

  return <>
    <section className="collections page-width" id="collections" aria-labelledby="collections-title">
      <div className="section-heading"><h2 id="collections-title">Made of moments.</h2><p>Four programmes. One community.<br />Choose an album to see it unfold.</p></div>
      <nav className="album-nav" aria-label="Photo albums">{albums.map(album => <a key={album.id} href={`#${album.id}`} aria-current={activeAlbum === album.id ? 'location' : undefined} onClick={() => setActiveAlbum(album.id)}><Icon name="folder" /><span>{album.name}</span><span className="album-count" aria-label={`${album.photos.length} photographs`}>{album.photos.length}</span></a>)}</nav>
      {albums.map((album, albumIndex) => <section className={`album album-${album.id}`} id={album.id} key={album.id} aria-labelledby={`${album.id}-title`}>
        <div className="album-heading"><h3 id={`${album.id}-title`}>{album.name}</h3><div className="album-details"><span>{album.photos.length} photographs</span><a href={`https://drive.google.com/drive/folders/${album.folder}`} target="_blank" rel="noopener noreferrer">Open original album</a></div></div>
        {album.photos.length ? <div className="photo-grid">{album.photos.map((photo, photoIndex) => <button className="photo-button" key={photo.file} onClick={() => openPhoto(albumIndex, photoIndex)} aria-label={`View ${album.name} photograph ${photoIndex + 1}`}><Photo file={photo.file} alt={photo.alt} sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 600px" /><span className="photo-open" aria-hidden="true"><Icon name="expand" /></span></button>)}</div> : <p className="empty-album">No photos in this album yet.</p>}
      </section>)}
    </section>
    <dialog className="photo-viewer" ref={dialog} aria-labelledby="viewer-title" onClose={() => setSelection(null)} onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); movePhoto(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); movePhoto(1); } }}>
      <div className="viewer-header"><div><h2 id="viewer-title">{selectedAlbum?.name || 'Photo viewer'}</h2><p className="viewer-counter" aria-live="polite">{selection && selectedAlbum ? `${selection.photoIndex + 1} of ${selectedAlbum.photos.length}` : ''}</p></div><button className="icon-button" onClick={() => setSelection(null)} aria-label="Close photo viewer"><Icon name="close" /></button></div>
      <div className="viewer-stage"><button className="icon-button viewer-previous" onClick={() => movePhoto(-1)} aria-label="Previous photo"><Icon name="previous" /></button><div className="viewer-image" aria-busy={loading}>{selectedPhoto && <Photo key={selectedPhoto.file} file={selectedPhoto.file} alt={selectedPhoto.alt} sizes="90vw" priority onLoad={() => setLoading(false)} />}{loading && <span className="image-loading" aria-hidden="true" />}</div><button className="icon-button viewer-next" onClick={() => movePhoto(1)} aria-label="Next photo"><Icon name="next" /></button></div>
      <div className="viewer-footer"><p>{selectedPhoto?.alt}</p><div className="viewer-thumbnails" aria-label="Album photographs">{selectedAlbum?.photos.map((photo, index) => <button key={photo.file} aria-label={`Show photograph ${index + 1}`} aria-pressed={selection?.photoIndex === index} onClick={() => selection && openPhoto(selection.albumIndex, index)}><Image src={`/assets/${photo.file}.webp`} alt="" fill sizes="64px" /></button>)}</div></div>
    </dialog>
  </>;
}
