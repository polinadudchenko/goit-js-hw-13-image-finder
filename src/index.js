import './sass/main.scss';
import ImagesApiService from './js/apiService';
import getRefs from './js/refs';
import imagesTmpl from './templates/imagesTmpl.hbs';
//import '~material-design-icons/iconfont/material-icons.css';
import {error, alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const { searchForm, galleryContainer, loadMoreBtn } = getRefs();
const imagesApiService = new ImagesApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch(event) {
    event.preventDefault();
    imagesApiService.query = event.currentTarget.elements.query.value;
    imagesApiService.resetPage();
    galleryContainer.innerHTML = '';
    imagesApiService.fetchImages().then(images => appendImagesMarkup(images));
}

function onLoadMore() {
    imagesApiService.fetchImages().then(images => appendImagesMarkup(images));
    loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function appendImagesMarkup(images) {
    galleryContainer.insertAdjacentHTML('beforeend', imagesTmpl(images))
}