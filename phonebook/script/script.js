import * as render from './modules/render.js';
import * as storage from './modules/serviceStorage.js';
import hoverRow from './modules/hoverRow.js';
import * as control from './modules/controls.js';

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

    const data = storage.getStorage('phonebook');
    const allRow = render.renderContacts(list, data);
    const {closeModal} = control.modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    control.deleteControl(btnDel, list);
    control.formControl(form, list, closeModal);

    // сортировка по алфавиту
    const thead = document.querySelector('thead');
    const allTh = document.querySelectorAll('.th-sort');
    let clickTarget;
    let direction;

    const sortTh = e => {
      if (e.target.matches('.th-sort')) {
        if (e.target.textContent !== clickTarget) {
          direction = 'increase';
          allTh.forEach(item =>
            item.classList.remove('th-sort-up', 'th-sort-down'));
        }

        clickTarget = e.target.textContent;

        const mult = direction === 'increase' ? 1 : -1;
        direction = direction === 'increase' ? 'descending' : 'increase';

        switch (direction) {
          case 'increase':
            e.target.classList.toggle('th-sort-up');
            e.target.classList.toggle('th-sort-down');
            break;

          case 'descending':
            e.target.classList.remove('th-sort-up');
            e.target.classList.add('th-sort-down');
            break;

          default:
            e.target.classList.add('th-sort-up');
            break;
        }

        let i;

        switch (e.target.textContent) {
          case 'Имя':
            i = 1;
            break;

          case 'Фамилия':
            i = 2;
            break;

          default:
            return;
        }

        const tableArr = [...table.rows].slice(1).sort((rowA, rowB) => {
          switch (true) {
            case rowA.cells[i].innerHTML > rowB.cells[i].innerHTML:
              return 1 * mult;
            case rowA.cells[i].innerHTML < rowB.cells[i].innerHTML:
              return -1 * mult;
            default:
              return 0;
          }
        });

        list.append(...tableArr);
      }
    };

    thead.addEventListener('click', sortTh);
  };

  window.phoneBookInit = init;
}
