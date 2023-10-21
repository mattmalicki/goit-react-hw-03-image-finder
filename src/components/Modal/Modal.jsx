import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export class Modal extends Component {
  render() {
    const { src, alt, close } = this.props;
    return (
      <div
        id="modal"
        className={styles.Overlay}
        onClick={close}
        onKeyDown={close}
      >
        {window.addEventListener('keydown', close)}
        <div className={styles.Modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  close: PropTypes.func,
};
