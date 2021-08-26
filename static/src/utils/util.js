const removeElement = (selector) => {
  document.querySelector(selector).innerHTML = "";
};

const getElement = (id) => document.getElementById(id);

const getSessionId = () => {
  const nowSession = localStorage.getItem("session_id");
  if (!nowSession) {
      location.href='./index.html';
  }
  return nowSession;
};

export {
    removeElement,
    getElement,
    getSessionId,
}