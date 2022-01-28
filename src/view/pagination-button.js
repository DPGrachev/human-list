import AbstractView from './abstract.js';

const createPaginationButtonTemplate = (pageNumber, currentPageNumber) => (
  `<button class='pagination_button ${currentPageNumber === pageNumber ? 'pagination_button__active' : ''}'>${pageNumber}</button>`
);

class PaginationButton extends AbstractView {
  constructor(pageNumber, currentPageNumber){
    super();
    this._pageNumber = pageNumber;
    this._currentPageNumber = currentPageNumber;

    this._onPaginationButtonClick = this._onPaginationButtonClick.bind(this);
  }

  getTemplate(){
    return createPaginationButtonTemplate(this._pageNumber, this._currentPageNumber);
  }

  _onPaginationButtonClick(){
    this._callback.onPaginationButtonClick(this._pageNumber);
  }

  //метод устанавливающий слушатель на кнопку пагинации
  setOnPaginationButtonClick(callback){
    this._callback.onPaginationButtonClick = callback;
    this.getElement().addEventListener('click', this._onPaginationButtonClick);
  }
}

export default PaginationButton;
