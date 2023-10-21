import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    const { smallSrc, largeSrc, tags } = this.props;
    return (
      <li className={styles.ImageGalleryItem}>
        <img
          src={smallSrc}
          data-large-image={largeSrc}
          alt={tags}
          className={styles.ImageGalleryItemImage}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallSrc: PropTypes.string,
  largeSrc: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};
