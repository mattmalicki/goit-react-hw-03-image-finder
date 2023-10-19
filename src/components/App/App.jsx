import { Component } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { Modal } from '../Modal/Modal';

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
    currentPage: 1,
    currentQuery: '',
    modalOpen: false,
    modal: {
      src: '',
      tags: [],
    },
  };

  handleCurrentPageUpdate = () => {
    this.setState(state => {
      return {
        currentPage: state.currentPage + 1,
      };
    });
  };

  handleClick = () => {
    this.handleCurrentPageUpdate();
  };

  handleSubmit = async event => {
    event.preventDefault();
    await this.getImages();
    console.log(this.state.modalOpen);
  };

  async componentDidUpdate() {
    await this.getImages();
  }

  openModal = event => {
    if (event.target.nodeName !== 'IMG') {
      return;
    }
    const image = event.target;

    this.setState({
      modalOpen: true,
      modal: { src: image.src, tags: image.alt },
    });
    console.log(this.state.modalOpen);
  };

  closeModal = event => {
    if (event.target.id !== 'modal' || event.key === 'Escape') {
      this.setState({
        modalOpen: false,
        modal: { src: '', tags: [] },
      });
    }
    return;
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
      this.setState({ images: images.hits });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    const oldState = this.state;

    if (
      nextState.images[0]?.id === oldState.images[0]?.id &&
      nextState.currentPage === oldState.currentPage &&
      nextState.openModal === oldState.openModal
    ) {
      return false;
    }

    return true;
  }

  render() {
    const {
      error,
      isLoading,
      images,
      modalOpen,
      closeModal,
      openModal,
      modal,
    } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar submit={this.handleSubmit} />
        {error && <p>Something went wrong: {error.message}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={this.state.images} openModal={openModal} />
        )}
        {images.length > 0 && <Button handleClick={this.handleClick} />}
        {modalOpen && (
          <Modal src={modal.src} alt={modal.tags} close={closeModal} />
        )}
      </div>
    );
  }
}
