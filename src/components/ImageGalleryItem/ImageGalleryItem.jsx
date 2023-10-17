import { Component } from 'react';
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
