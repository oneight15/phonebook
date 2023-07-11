const sort = (table, list) => {
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

export default sort;
