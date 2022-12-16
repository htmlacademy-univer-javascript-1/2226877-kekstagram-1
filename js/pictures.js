import {photos} from './data.js';
import {openPictureModal} from './big-picture.js';

const picturesListElement = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const appendPicture = (picture) => {
  const {id, url, likes, comments} = picture;

  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.id = id;

  pictureElement.addEventListener('click', () => {
    openPictureModal(picture);
  });

  picturesFragment.appendChild(pictureElement);
};

export const renderPictures = () => {
  photos.forEach(appendPicture);
  picturesListElement.appendChild(picturesFragment);

  picturesListElement.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (pictureElement) {
      const clickedPicture = photos.find(({id}) => Number(pictureElement.dataset.id) === id);
      openPictureModal(clickedPicture);
    }
  });

};
