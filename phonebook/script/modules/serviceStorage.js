export const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

export const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const addContactData = contact => {
  const data = getStorage('phonebook');
  data.push(contact);
  setStorage('phonebook', data);
};

export const removeStorage = phone => {
  const data = getStorage('phonebook');
  const newData = data.filter(item => item.phone !== phone);
  setStorage('phonebook', newData);
};

