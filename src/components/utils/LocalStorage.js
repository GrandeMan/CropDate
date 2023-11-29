const localStorageData = (key, value) => {
  if (value === undefined) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export default localStorageData;
