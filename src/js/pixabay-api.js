import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50360143-67f83f4bf6f92da79a63477ea';

export function getImagesByQuery(query) {
  return axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Axios error:', error);
      throw error;
    });
}