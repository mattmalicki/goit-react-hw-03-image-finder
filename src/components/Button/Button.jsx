import { Component } from 'react';
import styles from './Button.module.css';

export class Button extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <button className={styles.Button} onClick={handleClick}>
        Load more
      </button>
    );
  }
}
