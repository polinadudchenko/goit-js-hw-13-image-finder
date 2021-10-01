import './sass/main.scss';
import ImagesApiService from './js/apiService';
import LoadMoreBtn from './js/loadMoreBtn';
import getRefs from './js/refs';
import imagesTmpl from './templates/imagesTmpl.hbs';
import {error, alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const { searchForm, galleryContainer } = getRefs();
const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
})

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(event) {
    event.preventDefault();
    
    imagesApiService.query = event.currentTarget.elements.query.value.trim();
    if (!imagesApiService.query) {
        return alert({text: 'That is empty query. Please type something'})
    }
    clearImagesContainer();
    imagesApiService.resetPage();
    loadMoreBtn.show();
    fetchImages(); 
}

function fetchImages() {
    loadMoreBtn.disable();
    imagesApiService.fetchImages().then(images => {
        appendImagesMarkup(images);
        loadMoreBtn.enable();
        smoothScroll();
    }).catch(onFetchError);
}

function appendImagesMarkup(images) {
    galleryContainer.insertAdjacentHTML('beforeend', imagesTmpl(images))
}

function  onFetchError(err) {
    if (err.status === 404) {
        error({
            text: 'No matches found, please enter a new query.'
        })
    }
}

function clearImagesContainer() {
    galleryContainer.innerHTML = '';
}

function smoothScroll() {
loadMoreBtn.refs.button.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
}