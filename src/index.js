import './sass/main.scss';
import ImagesApiService from './js/apiService';
import getRefs from './js/refs';
import imagesTmpl from './templates/image-card.hbs';

const { searchForm, galleryContainer, loadMoreBtn } = getRefs();
const imagesApiService = new ImagesApiService();

searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();
    imagesApiService.query = event.currentTarget.elements.query.value;

    imagesApiService.fetchImages().then(images => appendImagesMarkup(images))
}

function appendImagesMarkup(images) {
    galleryContainer.insertAdjacentHTML('beforeend', imagesTmpl(images))
}