import { Button } from '../Button/Button';
import axios from 'axios';
import { Component } from 'react';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { Notify } from 'notiflix';
import { Searchbar } from '../Searchbar/Searchbar';
import styles from './App.module.css';

export class App extends Component {
  API_KEY = '38855458-8cac518777b782fa6e9540f58';
  API_URL = 'https://pixabay.com/api/';
  API_PER_PAGE = 12;
  API_IMAGE_TYPE = 'photo';
  API_ORIENTATION = 'horizontal';
  state = {
    images: [],
    isLoading: false,
    error: '',
    currentPage: 0,
    currentQuery: '',
    modalOpen: false,
    totalHits: 0,
    modal: {
      src: '',
      tags: [],
    },
  };

  handleCurrentPageUpdate = async () => {
    this.setState(
      state => {
        return {
          isLoading: true,
          currentPage: state.currentPage + 1,
        };
      },
      () => this.getImages()
    );
  };

  handleClick = async () => {
    this.handleCurrentPageUpdate();
  };

  handleSubmit = async event => {
    event.preventDefault();

    const form = event.currentTarget;
    this.setState(
      {
        isLoading: true,
        currentQuery: form.querry.value,
        currentPage: 1,
        images: [],
      },
      () => this.getImages()
    );
  };

  handleOpenModal = event => {
    if (event.target.nodeName !== 'IMG') {
      return;
    }
    const image = event.target;

    this.setState({
      modalOpen: true,
      modal: { src: image.src, tags: image.alt },
    });
  };

  handleCloseModal = event => {
    if (event.target.id === 'modal' || event.key === 'Escape') {
      this.setState({
        modalOpen: false,
        modal: { src: '', tags: [] },
      });
    }
  };

  getImages = async () => {
    try {
      const respond = await axios.get(this.API_URL, {
        params: {
          key: this.API_KEY,
          orientation: this.API_ORIENTATION,
          image_type: this.API_IMAGE_TYPE,
          per_page: this.API_PER_PAGE,
          q: this.state.currentQuery,
          page: this.state.currentPage,
        },
      });
      const images = await respond.data;
      if (images.hits.length === 0) {
        new Notify.failure('Sorry, no images found', { clickToClose: true });
        this.setState({ currentPage: 0 });
        return;
      }
      setTimeout(() => {
        this.setState(state => {
          return {
            images: state.images.concat(images.hits),
            totalHits: images.totalHits,
          };
        });
      }, 1000);
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    const oldState = this.state;

    return !(
      nextState.images?.length === oldState.images?.length &&
      nextState.currentPage === oldState.currentPage &&
      nextState.currentQuery === oldState.currentQuery &&
      nextState.modalOpen === oldState.modalOpen
    );
  }

  render() {
    const { error, isLoading, images, totalHits, modalOpen, modal } =
      this.state;
    return (
      <div className={styles.App}>
        <Searchbar submit={this.handleSubmit} />
        {error && <p>Something went wrong: {error.message}</p>}
        {images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            openModal={this.handleOpenModal}
          />
        )}
        {isLoading && <Loader />}
        {images.length !== 0 && images.length !== totalHits && (
          <Button handleClick={this.handleClick} />
        )}
        {modalOpen && (
          <Modal
            src={modal.src}
            alt={modal.tags}
            close={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
