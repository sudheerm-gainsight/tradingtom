// Basic localStorage helpers

export const getData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Initialize default keys once
export const initDB = () => {
  if (!localStorage.getItem("users")) setData("users", []);
  if (!localStorage.getItem("courses")) setData("courses", []);
  if (!localStorage.getItem("modules")) setData("modules", []);
  if (!localStorage.getItem("news")) setData("news", []);
  if (!localStorage.getItem("purchases")) setData("purchases", []);
};