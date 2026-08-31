import React from 'react';
import styles from './GalleryPage.module.css';
import PhotoGallery from '../components/PhotoGallery/PhotoGallery';

const GalleryPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <PhotoGallery />
    </div>
  );
};

export default GalleryPage;
