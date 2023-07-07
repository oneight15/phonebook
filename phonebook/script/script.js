'use strict';

// const data = [
//   {
//     name: 'Иван',
//     surname: 'Петров',
//     phone: '+79514545454',
//   },
//   {
//     name: 'Игорь',
//     surname: 'Семёнов',
//     phone: '+79999999999',
//   },
//   {
//     name: 'Семён',
//     surname: 'Иванов',
//     phone: '+79800252525',
//   },
//   {
//     name: 'Мария',
//     surname: 'Попова',
//     phone: '+79876543210',
//   },
// ];

{
  const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

  const setStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addContactData = contact => {
    const data = getStorage('phonebook');
    data.push(contact);
    setStorage('phonebook', data);
  };

  const removeStorage = phone => {
    const data = getStorage('phonebook');
    const newData = data.filter(item => item.phone !== phone);
    setStorage('phonebook', newData);
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th class="th-sort">Имя</th>
        <th class="th-sort">Фамилия</th>
        <th>Телефон</th>
        <th></th>
      </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name" 
          id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname" 
          id="surname" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone" 
          id="phone" type="number" required>
      </div>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;

    return footer;
  };

  const createFooterText = title => {
    const p = document.createElement('p');
    p.textContent = `Все права защищены ©${title}`;
    p.style.margin = 0;
    return p;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const {form, overlay} = createForm();
    const footer = createFooter();
    const footerText = createFooterText(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    footer.footerContainer.append(footerText);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
      table,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    tdDel.append(buttonDel);
    buttonDel.classList.add('del-icon');

    const tdName = document.createElement('td');
    tdName.classList.add('name');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    tdPhone.classList.add('phone');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    const tdEdit = document.createElement('td');
    const btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.classList.add('btn', 'btn-outline-success', 'btn-sm');
    btnEdit.textContent = 'Редактировать';
    tdEdit.append(btnEdit);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', () => {
      openModal();
    });

    formOverlay.addEventListener('click', e => {
      const target = e.target;
      if (target === formOverlay || target.closest('.close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        const targetRow = target.closest('.contact');
        targetRow.remove();
        const targetTd = targetRow.querySelector('.phone');
        removeStorage(targetTd.textContent);
      }
    });
  };

  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const newContact = Object.fromEntries(formData);

      addContactPage(newContact, list);
      addContactData(newContact);

      form.reset();
      closeModal();
    });
  };

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
    } = renderPhoneBook(app, title);

    // Функционал

    const data = getStorage('phonebook');
    const allRow = renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

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
