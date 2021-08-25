const removeElement = (selector) => {
  document.querySelector(selector).innerHTML = "";
};

const getElement = (id) => document.getElementById(id);

export {
    removeElement,
    getElement,
}