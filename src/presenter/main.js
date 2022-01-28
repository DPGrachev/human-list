import { remove, render, RenderPosition, replace} from '../utils';
import { data } from '../mock/data';
import TableLine from '../view/table-line';
import PaginationArea from '../view/pagination-area';
import Table from '../view/table';
import TableLineEditor from '../view/table-line-editor';
import PaginationButton from '../view/pagination-button';

const sort = {
  firstName : (a,b) => {
    if (a.name.firstName < b.name.firstName) {
      return -1;
    }
    if (a.name.firstName > b.name.firstName) {
      return 1;
    }
    return 0;
  },
  lastName : (a,b) => {
    if (a.name.lastName < b.name.lastName) {
      return -1;
    }
    if (a.name.lastName > b.name.lastName) {
      return 1;
    }
    return 0;
  },
  about : (a,b) => {
    if (a.about < b.about) {
      return -1;
    }
    if (a.about > b.about) {
      return 1;
    }
    return 0;
  },
  eyeColor : (a,b) => {
    if (a.eyeColor < b.eyeColor) {
      return -1;
    }
    if (a.eyeColor > b.eyeColor) {
      return 1;
    }
    return 0;
  },
};

class Main {
  constructor(){
    this._table = new Table();
    this._data = data;
    this._humanList = new Map();
    this._paginationButtons = new Map();
    this._tableBody = this._table.getElement().querySelector('.table_body');
    this._mainContainer = document.querySelector('.container');
    this._paginationArea = new PaginationArea;
    this._paginationStep = 10;
    this._currentPageNumber = 1;
    this._maxPageNumbers = Math.ceil(this._data.length / this._paginationStep);

    this._onSortButtonClick = this._onSortButtonClick.bind(this);
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
    this._onConfirmButtonClick = this._onConfirmButtonClick.bind(this);
    this._onCancelButtonClick = this._onCancelButtonClick.bind(this);
    this._onPaginationButtonClick = this._onPaginationButtonClick.bind(this);
  }

  // метод, запускающий работу презентера и отрисовку основных компонентов
  init(){
    this._renderTable();
    this._table.setOnSortButtonClick(this._onSortButtonClick);
    this._renderTableLines(this._getDataOnCurrentPage());
    this._renderPagination();
    this._renderPaginationButtons();
  }

  // возвращает данные в заданном диапазоне, по выбранной странице
  _getDataOnCurrentPage(){
    return data.slice(this._paginationStep * (this._currentPageNumber - 1), this._paginationStep * this._currentPageNumber);
  }

  _renderTableLines(humanList){
    //отрисовывает строки таблицы по указанным данным
    humanList.forEach((human) => {
      const tableLine = new TableLine(human);
      tableLine.setOnEditButtonClick(this._onEditButtonClick);
      this._humanList.set(human.id, tableLine);
      render(this._tableBody, tableLine, RenderPosition.BEFOREEND);
    });
  }

  //рендерит таблицу с заголовками
  _renderTable(){
    render(this._mainContainer, this._table, RenderPosition.BEFOREEND);
  }

  //рендерит контейнер для кнопок пагинации
  _renderPagination(){
    render(this._mainContainer, this._paginationArea, RenderPosition.BEFOREEND);
  }

  //рендерит кнопки выбора страниц
  _renderPaginationButtons(){
    for(let i=1; i<= this._maxPageNumbers; i++){
      const paginationButton = new PaginationButton(i, this._currentPageNumber);
      this._paginationButtons.set(i, paginationButton);
      //передает колбэк для кнопок пагинации
      paginationButton.setOnPaginationButtonClick(this._onPaginationButtonClick);
      render(this._paginationArea, paginationButton, RenderPosition.BEFOREEND);
    }
  }

  _onSortButtonClick(name){
    //сортирует данные по выбранному критерию
    this._data.sort(sort[name]);
    //переводит на первую страницу
    this._currentPageNumber = 1;
    //удаляет из разметки старый список и пагинацию
    this._humanList.forEach((tableLine) => remove(tableLine));
    this._paginationButtons.forEach((tableLine) => remove(tableLine));
    //рендерит обновленный список и пагинацию
    this._renderTableLines(this._getDataOnCurrentPage());
    this._renderPaginationButtons();
  }

  _onConfirmButtonClick(element, humanData){
    //создает экземляр обновленной строки
    const tableLine = new TableLine(humanData);
    //обновляет данные строки в мапе
    this._humanList.set(humanData.id, tableLine);
    //обновляет данные
    this._data[this._data.findIndex((human) => human.id === humanData.id)] = humanData;
    //заново устанавливает обработчик клика на кнопку редактирования
    tableLine.setOnEditButtonClick(this._onEditButtonClick);
    //заменяет форму редактирования на строку таблицы
    replace(tableLine, element);
  }

  _onCancelButtonClick(element, humanData){
    //заново создает экземляр строки
    const tableLine = new TableLine(humanData);
    //заново устанавливает обработчик клика на кнопку редактирования
    tableLine.setOnEditButtonClick(this._onEditButtonClick);
    //заменяет форму редактирования на строку таблицы
    replace(tableLine, element);
  }


  _onEditButtonClick(element, humanData){
    //создает экземпляр формы редактирования
    const tableLineEditor = new TableLineEditor(humanData);
    //устанавливает обработчики для кнопок отмены и потдтверждения изменений
    tableLineEditor.setOnCancelButtonClick(this._onCancelButtonClick);
    tableLineEditor.setOnConfirmButtonClick(this._onConfirmButtonClick);
    //заменяет строку таблицы на форму редактирования
    replace(tableLineEditor, element);
  }

  _onPaginationButtonClick(pageNumber){
    //изменяет номер текущей страницы
    this._currentPageNumber = pageNumber;
    //удаляет старые кнопки и отрисованный список
    this._paginationButtons.forEach((tableLine) => remove(tableLine));
    this._humanList.forEach((tableLine) => remove(tableLine));
    //отрисовывает новый список по текущей страницы и кнопки пагинации
    this._renderTableLines(this._getDataOnCurrentPage());
    this._renderPaginationButtons();
  }

}

export default Main;
