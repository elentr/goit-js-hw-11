import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions";


const searchForm = document.querySelector('.form');
// const gallery = document.querySelector('.gallery');
// const loaderEl = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });

searchForm.addEventListener('submit', evt => {
  evt.preventDefault();
  clearGallery();

  const query = evt.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

  showLoader();

  getImagesByQuery(query)
    .then(data => {
        const images = data.hits;

        if (images.length === 0) {
            iziToast.warning({
                title: 'Sorry',
                message: 'There are no images matching your search query. Please try again!',
                position: 'topRight',
                timeout: 3000,
            });
            return;
        }

        createGallery(images);
        searchForm.reset();
    })
    .catch(error => {
        console.error('Помилка при отриманні зображень:', error.message);
        iziToast.error({
            title: 'Error',
            message: 'Failed to fetch images. Please try again later.',
            position: 'topRight',
            timeout: 3000,
        });
    })
    .finally(() => {
        hideLoader();
    });
})