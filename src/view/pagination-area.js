import AbstractView from './abstract.js';

const createPaginationAreaTemplate = () => (
  `<div class='pagination'>
  </div>`
);

class PaginationArea extends AbstractView {
  getTemplate(){
    return createPaginationAreaTemplate();
  }
}

export default PaginationArea;
