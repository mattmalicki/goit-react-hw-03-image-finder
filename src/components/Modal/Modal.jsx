import { Component } from 'react';
import styles from './Modal.module.css';

export class Modal extends Component {
  render() {
    const { src, alt, close } = this.props;
    return (
      <div class={styles.Overlay} onClick={close}>
        <div class={styles.Modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
