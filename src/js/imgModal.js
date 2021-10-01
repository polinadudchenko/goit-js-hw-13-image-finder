import * as basicLightbox from 'basiclightbox'
export default function openImgModal(e) {  
    if (e.target.className !== 'gallery-card-img') {
        return;
    }
    const instance = basicLightbox.create(`<img src="${e.target.dataset.modal}" width="800" height="600">`);
    instance.show()
}

