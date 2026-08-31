import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './PhotoGallery.module.css';

import img1 from '../../assets/CommunityImages/img1.jpg';
import img2 from '../../assets/CommunityImages/img2.jpg';
import img3 from '../../assets/CommunityImages/img3.jpg';
import img4 from '../../assets/CommunityImages/img4.jpg';
import img5 from '../../assets/CommunityImages/img5.jpg';
import img6 from '../../assets/CommunityImages/img6.jpg';
import img7 from '../../assets/CommunityImages/img7.jpg';
import img8 from '../../assets/CommunityImages/img8.jpg';
import img9 from '../../assets/CommunityImages/img9.jpg';
import img10 from '../../assets/CommunityImages/img10.jpg';

const photos: string[] = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

// Flat infinite grid — each cell is a fixed slot in an endless plane, so panning
// in any direction just keeps revealing more (repeating) photos, polaroid-wall style.
const CARD_WIDTH = 230;
const CARD_HEIGHT = 210;
const CELL_WIDTH = 280;
const CELL_HEIGHT = 250;
const BUFFER_CELLS = 1; // extra rows/cols rendered outside the viewport so panning stays seamless

// how far the pointer has to move before a press counts as a drag rather than a click
const DRAG_THRESHOLD = 6;
// px of pan per px of pointer movement — 1 feels direct; lower it for a heavier feel
const DRAG_SENSITIVITY = 0.85;

const mod = (n: number, m: number) => ((n % m) + m) % m;

// deterministic-but-scrambled photo pick for a given grid cell, so the pattern
// doesn't look like an obvious repeating stripe
const photoForCell = (row: number, col: number) => photos[mod(row * 7 + col * 13, photos.length)];

// small deterministic "pinned to the wall" tilt per cell, in degrees
const tiltForCell = (row: number, col: number) => (mod(row * 11 + col * 17, 13) - 6) * 0.9;

type Tile = {
  key: string;
  photo: string;
  x: number;
  y: number;
  tilt: number;
};

type ActivePhoto = { photo: string; tilt: number };

const PhotoGallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<ActivePhoto | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const dragState = useRef({
    dragging: false,
    isDrag: false,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
  });

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activePhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhoto(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activePhoto]);

  const tiles: Tile[] = useMemo(() => {
    if (!size.width || !size.height) return [];

    const colsNeeded = Math.ceil(size.width / CELL_WIDTH) + BUFFER_CELLS * 2 + 1;
    const rowsNeeded = Math.ceil(size.height / CELL_HEIGHT) + BUFFER_CELLS * 2 + 1;
    const startCol = Math.floor(-pan.x / CELL_WIDTH) - BUFFER_CELLS;
    const startRow = Math.floor(-pan.y / CELL_HEIGHT) - BUFFER_CELLS;

    const list: Tile[] = [];
    for (let row = startRow; row < startRow + rowsNeeded; row += 1) {
      for (let col = startCol; col < startCol + colsNeeded; col += 1) {
        list.push({
          key: `${row}-${col}`,
          photo: photoForCell(row, col),
          x: col * CELL_WIDTH + pan.x,
          y: row * CELL_HEIGHT + pan.y,
          tilt: tiltForCell(row, col),
        });
      }
    }
    return list;
  }, [size, pan]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragState.current = {
      dragging: true,
      isDrag: false,
      startX: e.clientX,
      startY: e.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state.dragging) return;

    const deltaX = e.clientX - state.startX;
    const deltaY = e.clientY - state.startY;

    if (!state.isDrag && Math.hypot(deltaX, deltaY) > DRAG_THRESHOLD) {
      state.isDrag = true;
    }
    if (!state.isDrag) return;

    setPan({
      x: state.startPanX + deltaX * DRAG_SENSITIVITY,
      y: state.startPanY + deltaY * DRAG_SENSITIVITY,
    });
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasPressing = dragState.current.dragging;
    const wasDrag = dragState.current.isDrag;
    dragState.current.dragging = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    // setPointerCapture retargets the native click event to this wrapper, so a
    // tile button's own onClick never fires for real pointer input — resolve
    // the tile under the pointer ourselves via hit-testing instead. Only do
    // this for a genuine press-and-release (not a pointerleave/cancel with no
    // prior press, and not the end of an actual drag).
    if (!wasPressing || wasDrag || e.type !== 'pointerup') return;
    const target = document.elementFromPoint(e.clientX, e.clientY);
    const tileEl = target?.closest<HTMLElement>('[data-photo]');
    if (tileEl) {
      const photo = tileEl.dataset.photo!;
      const tilt = Number(tileEl.dataset.tilt || 0);
      setActivePhoto({ photo, tilt });
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Photo Gallery</h2>

      <div
        ref={wrapperRef}
        className={styles.fieldWrapper}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        {tiles.map((tile) => {
          const offsetX = (CELL_WIDTH - CARD_WIDTH) / 2;
          const offsetY = (CELL_HEIGHT - CARD_HEIGHT) / 2;
          return (
            <button
              key={tile.key}
              type="button"
              className={styles.tile}
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                transform: `translate3d(${tile.x + offsetX}px, ${tile.y + offsetY}px, 0) rotate(${tile.tilt}deg)`,
              }}
              data-photo={tile.photo}
              data-tilt={tile.tilt}
              aria-label="View photo"
            >
              <img src={tile.photo} alt="" className={styles.tileImage} draggable={false} />
            </button>
          );
        })}
        <div className={styles.vignette} />
      </div>

      {activePhoto && (
        <div className={styles.lightboxOverlay} onClick={() => setActivePhoto(null)}>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close"
            onClick={() => setActivePhoto(null)}
          >
            &times;
          </button>
          <div
            className={styles.lightboxPolaroid}
            style={{ transform: `rotate(${activePhoto.tilt * 0.4}deg)` }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={activePhoto.photo} alt="" className={styles.lightboxPhoto} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
