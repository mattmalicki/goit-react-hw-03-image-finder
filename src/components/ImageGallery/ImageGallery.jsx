import { Component } from 'react';
import styles from './ImageGallery.module.css';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { images, openModal } = this.props;
    return (
      <ul className={styles.ImageGallery} onClick={openModal}>
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              smallSrc={image.webformatURL}
              largeSrc={image.largeImageURL}
              tags={image.tags}
            />
          );
        })}
      </ul>
    );
  }
}
