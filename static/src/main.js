import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

let state =  new Map()

const setCurrentChoice = (data) => {state.set("currentChoice", data)};
const getCurrentChoice = () => state.get("currentChoice")
const setCurrentQuiz = (data) => state.set("currentQuiz", data);
const getCurrentQuiz = () => state.get("currentQuiz")

const getElement = (id) => document.getElementById(id);

const nowData = {
  quizId: getCurrentQuiz(),
  choiceId: getCurrentChoice(),
}

const createChoices = (list) => {
  const choices = getElement("choicesContainer");
  console.log(list)

  list.choices.map(({ text, id }) => {
    const choiceBtn = document.createElement("button");
    const crrElId = `choices_${id}`;

    choiceBtn.setAttribute("id", crrElId);
    choiceBtn.setAttribute("className", "choice");
    choiceBtn.innerText = text;

    choices.appendChild(choiceBtn);

    const nowChoiceBtn = getElement(crrElId)
    nowChoiceBtn.addEventListener("click", () => {
      // 現在の選択肢のID
      setCurrentChoice(id)
    });
  });

  return;
};

const clearChoices = () => {
  const choices = getElement("choicesContainer");
  choices.innerHTML = "";
};

window.onload = async () => {
  const data = await fetchJSON("/api/getQuizList");
  // 次の問題へ行くためのやつ
  setCurrentQuiz(data.shift())

  const currQuiz = getCurrentQuiz()
  createChoices(currQuiz)

  // submit されたらクリアー
  const submitButton = getElement("submitButton");
  submitButton.addEventListener("click", () => {
    console.log(nowData)
  })

  const isCollect = await fetchJSON("/api/getAnswer", nowData)
  if (isCollect) {
    
  }
};
