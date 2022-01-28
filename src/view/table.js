import AbstractView from './abstract.js';

const createTableTemplate = () => (
  `<table class="table">
        <thead>
          <tr>
            <th>name <button class='sort_button' data-name='firstName'></button></th>
            <th>surname <button class='sort_button' data-name='lastName'></button></th>
            <th>about <button class='sort_button' data-name='about'></button></th>
            <th>eye color <button class='sort_button' data-name='eyeColor'></button></th>
          </tr>
        </thead>
        <tbody class='table_body'>

        </tbody>
      </table>`
);

class Table extends AbstractView {
  constructor(){
    super();
    this._onSortButtonClick = this._onSortButtonClick.bind(this);
  }

  getTemplate(){
    return createTableTemplate();
  }

  //метод, вызываемый при событии клика на кнопку сортировки
  _onSortButtonClick(evt) {
    evt.preventDefault();
    this._callback.OnSortButtonClick(evt.target.dataset.name);
  }

  //метод, устанавливающий слушатель на кнопки сортировки
  setOnSortButtonClick(callback){
    this._callback.OnSortButtonClick = callback;
    this.getElement().querySelectorAll('.sort_button').forEach((button) => button.addEventListener('click', this._onSortButtonClick));
  }
}

export default Table;
