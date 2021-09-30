const apiKey = '23620091-2d5d28040986b37b269a969d4';
const BASE_URL = 'https://pixabay.com/api/'

export default class ImagesApiServer {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${apiKey}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                this.page += 1;
                return data.hits;
            });
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}