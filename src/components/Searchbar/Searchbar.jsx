import { Component } from 'react';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  render() {
    const { submit } = this.props;
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={submit}>
          <button className={styles['SearchForm-button']} type="submit">
            <span className={styles['SearchForm-button-label']}>Search</span>
          </button>
          <input
            className={styles['SearchForm-input']}
            name="querry"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
