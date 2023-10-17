import { Component } from 'react';
import styles from './ImageGallery.module.css';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { images } = this.props;
    return (
      <ul className={styles.ImageGallery}>
        {console.log(images[0].webformatURL)}
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
