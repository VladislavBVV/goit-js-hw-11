import './sass/index.scss';
import './sass/_common.scss';
import fetchApi from './js/fetch';
import { renderGallery } from './js/js';
import { Notify } from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

// const API_KEY = 30783584 - a1be3f956269c817fc7780fef;



let cardsGallery = document.querySelector('.gallery ');
const onSearchForm = document.querySelector('#search-form');
onSearchForm.addEventListener('submit', onSearch);
const button = document.querySelector('[data-action="load-more"]');
// const ButtonLoad = new LoadMoreButton({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });
button.addEventListener('click', onLoadMore);

clearList();
console.log(button);
// console.log(searchForm);
// console.log(container);
// console.log(searchButton);
// console.log(loadMoreButton);

const fetch = new fetchApi();
    
// searchForm.addEventListener('submit', onSearch);
// loadMoreButton.addEventListener('click', loadMore);

// let searchQuery = '';

button.style.opacity = '0'

button.disabled = true;

async function onSearch(e) { 
  e.preventDefault();
  
  fetch.searchQuery = e.currentTarget.elements.searchQuery.value;
  fetch.resetPage();
  // clearList();

  try {
    if (fetch.searchQuery === '') {
      clearList();
      Notify.failure('Please enter your search data.');
    } else {
      const response = await fetch.makesRequest();
      const {
        data: { hits, total, totalHits },
      } = response;

      if (hits.length === 0) {
        // button.classList.add('is-hidden');

        setTimeout(
          Notify.info(
            'Sorry, there are no images matching your search query. Please try again.'
          ),
          0
        );
      } else {
        // ButtonLoad.disable();
        clearList();

        // ButtonLoad.disable();

        Notify.success(`Hooray! We found ${totalHits} images.`);
        renderGallery(hits);
        button.disable = false;
        button.style.opacity = '1';
        button.disabled = false;

        // ButtonLoad.enable();

        // ButtonLoad.show();
        // button.classList.remove('is-hidden');
    simpleLightbox();

      }
    
    }
    // ButtonLoad.show();
  } catch (error) {
        button.disabled = true;
 Notify.failure("We're sorry, but you've reached the end of search results.");
        // button.classList.add('is-hidden');

  }
}

function clearList() {
  cardsGallery.innerHTML = '';
}

function simpleLightbox() {
  let lightbox = new SimpleLightbox('.gallery a', {
    captions: false,
    captionDelay: 250,
    enableKeyboard: true,
    doubleTapZoom: 5,
  });
  lightbox.refresh();
}

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')

    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
async function onLoadMore() {

const response = await fetch.makesRequest();
const {
  data: { hits },
} = response;

  if (hits.length === 0) {
        button.classList.add('is-hidden');
        button.style.opacity = '0'
  
Notify.failure("We're sorry, but you've reached the end of search results.");
  } else
    simpleLightbox()
  // fetch.incrementPage
  renderGallery(hits);
  button.style.opacity = '1'
};