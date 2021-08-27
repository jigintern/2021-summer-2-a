import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";
import {
  removeElement,
  getElement,
  getSessionId,
} from './utils/util.js'


const createAnswersList = ({ answers }) => {
  answers.map(({ answer, statement, correct }) => {
    const container = document.createElement("div");
    const statementEl = document.createElement("div");
    const correctEl = document.createElement("div");

    container.setAttribute("class", "answerContainer")
    
    statementEl.setAttribute("class", "statement button_unclick")
    statementEl.innerText = statement

    correctEl.setAttribute("class", "correct")
    correctEl.innerHTML = correct 
      ? '<div class="correct-icon"><svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.75" y="1.75" width="34.5" height="34.5" rx="17.25" stroke="url(#paint0_linear)" stroke-width="3.5"/><defs><linearGradient id="paint0_linear" x1="-3.52922e-08" y1="1.5" x2="36" y2="33" gradientUnits="userSpaceOnUse"><stop stop-color="#4481EB"/><stop offset="1" stop-color="#04BEFE"/></linearGradient></defs></svg></div>'
      : '<div class="correct-icon"><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L34 34M2 34L34 2" stroke="url(#paint1_linear)" stroke-width="3.5"/><defs><linearGradient id="paint1_linear" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse"><stop stop-color="#FC6076"/><stop offset="1" stop-color="#FF9A44"/></linearGradient></defs></svg></div>'


    container.appendChild(statementEl)
    container.appendChild(correctEl)

    getElement("answersListContainer").appendChild(container);
  });

  return;
};

window.onload = async () => {
  const session = getSessionId()
  console.log(session)
  const resultData = await fetchJSON("/api/getUsersLatestAnswer", { session })
  console.log(resultData)
  
  const questionsLen = resultData.answers.length
  console.log(questionsLen)
  getElement("yourScore").innerText = `${resultData.answer_count} / ${questionsLen}  点`

  createAnswersList(resultData)
}