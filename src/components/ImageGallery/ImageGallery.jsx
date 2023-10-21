import { Component } from 'react';
import PropTypes from 'prop-types';
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

ImageGallery.propTypes = {
  openModal: PropTypes.func,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
