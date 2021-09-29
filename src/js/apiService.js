export default class ImagesApiServer{
    construcor() {
        this.searchQUery;
    }

    fetchImages() {
       /*  const options = {
            headers: {
                Autorization: '23620091-2d5d28040986b37b269a969d4'
            } 
        } */

        const apyKey = '23620091-2d5d28040986b37b269a969d4';

        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQUery}&page=1&per_page=12&key=${apyKey}`;

        fetch(url).then(response => response.json()).then(console.log)
    }
}