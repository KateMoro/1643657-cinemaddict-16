import { getFormattedDate, getTimeFromMins } from '../utils/common.js';
import AbstractView from './abstract-view.js';

const createFilmCardTemplate = ({title, totalRating, releaseDate, runtime, genres, poster, description, comments, isWatchList, isWatched, isFavorite}) => {

  const activeClassName = (item) => item ? 'film-card__controls-item--active' : '';

  const truncateString = (str, maxlength) => str.length > maxlength ? `${str.slice(0, maxlength - 1)}…` : str;

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${getFormattedDate(releaseDate, 'YYYY')}</span>
        <span class="film-card__duration">${getTimeFromMins(runtime)}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${truncateString(description, 140)}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item
                     film-card__controls-item--add-to-watchlist
                     ${activeClassName(isWatchList)}"
                     type="button">
                     Add to watchlist
      </button>
      <button class="film-card__controls-item
                     film-card__controls-item--mark-as-watched
                     ${activeClassName(isWatched)}"
                     type="button">
                     Mark as watched
      </button>
      <button class="film-card__controls-item
                     film-card__controls-item--favorite
                     ${activeClassName(isFavorite)}"
                     type="button">
                     Mark as favorite
      </button>
    </div>
  </article>`;
};

export default class FilmCardView extends AbstractView {
  #card = null;

  constructor(card) {
    super();
    this.#card = card;
  }

  get template() {
    return createFilmCardTemplate(this.#card);
  }

  setLinkClickHandler = (callback) => {
    this._callback.linkClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#linkClickHandler);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  #linkClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.linkClick();
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
