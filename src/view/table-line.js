import AbstractView from './abstract.js';

const createTableLineTemplate = (human) => (
  `<tr>
    <td>${human.name.firstName}</td>
    <td>${human.name.lastName}</td>
    <td class='about_td'><span class='about'>${human.about}</span></td>
    <td class='eye_color'>${human.eyeColor}</td>
    <td class='edit'><button class='edit_button'></button></td>
  </tr>`
);
const createElement = (template) => {
  const newElement = document.createElement('table');
  newElement.innerHTML = template;

  return newElement.firstElementChild.firstElementChild;
};

class TableLine extends AbstractView {
  constructor(human){
    super();
    this._human = human;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  getTemplate(){
    return createTableLineTemplate(this._human);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  //метод, вызываемый при событии клика на кнопку редактирования
  _onEditButtonClick() {
    this._callback.OnEditButtonClick(this.getElement(), this._human);
  }

  //метод, устанавливающий слушатель на кнопку редактирования
  setOnEditButtonClick(callback){
    this._callback.OnEditButtonClick = callback;
    this.getElement().querySelector('.edit_button').addEventListener('click', this._onEditButtonClick);
  }
}

export default TableLine;
