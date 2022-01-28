import AbstractView from './abstract.js';


const createTableLineEditorTemplate = (human) => (
  `<tr>
    <td><input type='text' class='first_name_input' value='${human.name.firstName}'></td>
    <td ><input type='text' class='last_name_input' value='${human.name.lastName}'></td>
    <td class='about_td'><textarea class='about_textarea'>${human.about}</textarea></td>
    <td class='eye_color'><input type='text' class='eye_color_input' value='${human.eyeColor}'></td>
    <td class='edit'><button class='confirm_button'> <button class='cancel_button'></button></td>
  </tr>`
);
const createElement = (template) => {
  const newElement = document.createElement('table');
  newElement.innerHTML = template;

  return newElement.firstElementChild.firstElementChild;
};

class TableLineEditor extends AbstractView {
  constructor(human){
    super();
    //исходные данные
    this._oldHumanData = human;
    //измененные данные
    this._newHumanData = human;
    this._onFirstNameChange = this._onFirstNameChange.bind(this);
    this._onLastNameChange = this._onLastNameChange.bind(this);
    this._onAboutTextareaChange = this._onAboutTextareaChange.bind(this);
    this._onEyeColorChange = this._onEyeColorChange.bind(this);
    this._onConfirmButtonClick = this._onConfirmButtonClick.bind(this);
    this._onCancelButtonClick = this._onCancelButtonClick.bind(this);

    this.getElement().querySelector('.first_name_input').addEventListener('change', this._onFirstNameChange);
    this.getElement().querySelector('.last_name_input').addEventListener('change', this._onLastNameChange);
    this.getElement().querySelector('.about_textarea').addEventListener('change', this._onAboutTextareaChange);
    this.getElement().querySelector('.eye_color_input').addEventListener('change', this._onEyeColorChange);
  }

  getTemplate(){
    return createTableLineEditorTemplate(this._oldHumanData);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  //методы, изменяющие данные
  _onFirstNameChange(evt){
    this._newHumanData = {
      ...this._newHumanData,
      name: {
        ...this._newHumanData.name,
        firstName : evt.target.value,
      },
    };
  }

  _onLastNameChange(evt){
    this._newHumanData = {
      ...this._newHumanData,
      name: {
        ...this._newHumanData.name,
        lastName : evt.target.value,
      },
    };
  }

  _onAboutTextareaChange(evt){
    this._newHumanData = {
      ...this._newHumanData,
      about: evt.target.value,
    };
  }

  _onEyeColorChange(evt){
    this._newHumanData = {
      ...this._newHumanData,
      eyeColor: evt.target.value,
    };
  }

  _onConfirmButtonClick(){
    this._callback.OnConfirmButtonClick(this.getElement(), this._newHumanData);
  }

  _onCancelButtonClick(){
    this._callback.OnCancelButtonClick(this.getElement(), this._oldHumanData);
  }

  //метод, устанавливающий слушатель на кнопку подтверждения изменений
  setOnConfirmButtonClick(callback){
    this._callback.OnConfirmButtonClick = callback;
    this.getElement().querySelector('.confirm_button').addEventListener('click', this._onConfirmButtonClick);
  }

  //метод, устанавливающий слушатель на кнопку отмены
  setOnCancelButtonClick(callback){
    this._callback.OnCancelButtonClick = callback;
    this.getElement().querySelector('.cancel_button').addEventListener('click', this._onCancelButtonClick);
  }
}

export default TableLineEditor;
