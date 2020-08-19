import './styles.css';
import inputTemplate from './templates/input.hbs';
import galleryTemplate from './templates/galleryTemplate.hbs';
import insertImages from './templates/images.hbs';
import button from './templates/button.hbs';
import apiService from './apiService.js';
const _ = require('lodash');

const body = document.querySelector('body');
body.insertAdjacentHTML('afterbegin', inputTemplate());
body.insertAdjacentHTML('beforeend', galleryTemplate());
body.insertAdjacentHTML('beforeend', button());

const gallery = document.querySelector('.gallery');
const inputForm = document.querySelector('.search-form');
const buttonMore = document.querySelector('.button');

inputForm.addEventListener('input', _.debounce(queryImages, 1000));

const clearGallery = () => (gallery.innerHTML = '');

function queryImages(event) {
  apiService.myQuery = event.target.value;
  clearGallery();
  apiService.resetPage();
  apiService.myQuery && createMarkup();
  hideButton();
}

function createMarkup() {
  apiService
    .fetchImage()
    .then(images =>
      images.length ? markupImages(images) : alert('We can`t find images'),
    );
}

function markupImages(image) {
  gallery.insertAdjacentHTML('beforeend', insertImages(image));
  showButton();
}

function showButton() {
  buttonMore.classList.remove('hide');
}

function hideButton() {
  buttonMore.classList.add('hide');
}

buttonMore.addEventListener('click', () => {
  apiService.pageIncrement();
  createMarkup();
  window.scrollTo({
    top: window.pageYOffset,
    behavior: 'smooth',
  });
});
