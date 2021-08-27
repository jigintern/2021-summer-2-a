import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

const removeElement = (selector) => {
  document.querySelector(selector).innerHTML = "";
};

const getElement = (id) => document.getElementById(id);

const getSessionId = async () => {
  let nowSession = localStorage.getItem("session_id");
  if (!nowSession) {
      nowSession = await fetchJSON("/api/getSessionId", { session: nowSession });
      // location.href='./index.html';
  }
  return nowSession;
};

export {
    removeElement,
    getElement,
    getSessionId,
}