import * as render from './modules/render.js';
import {getStorage} from './modules/serviceStorage.js';
import hoverRow from './modules/hoverRow.js';
import * as control from './modules/controls.js';
import sort from './modules/sort.js';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
      form,
      table,
    } = render.renderPhoneBook(app, title);

    // Функционал

    const data = getStorage('phonebook');
    const allRow = render.renderContacts(list, data);
    const {closeModal} = control.modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    control.deleteControl(btnDel, list);
    control.formControl(form, list, closeModal);
    sort(table, list);
  };

  window.phoneBookInit = init;
}
