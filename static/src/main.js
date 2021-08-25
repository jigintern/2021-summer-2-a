import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

const state = new Map();

const setCurrChoice = (data) => state.set("currentChoose", data);
const getCurrChoice = () => state.get("currentChoose");

const getCurrentQuiz = (data) => state.set("currentQuiz", data);
const setCurrentQuiz = () => state.get("currentQuiz");

const getElement = (id) => document.getElementById(id);

const createChoices = (currentQuiz) => {
  const choices = getElement("choicesContainer");

  currentQuiz.choices.map(({ text, id }) => {
    const createdChoiceBtn = document.createElement("button");
    const crrElId = `choices_${id}`;

    createdChoiceBtn.setAttribute("id", crrElId);
    createdChoiceBtn.setAttribute("className", "choices_unchecked");
    createdChoiceBtn.innerText = text;

    choices.appendChild(createdChoiceBtn);

    getElement(crrElId)
      .addEventListener("click", () => {
        setCurrChoice(id);
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
  currentData.set();
  data.pop();
  await createChoices();
  getCurrentQuiz();
  await createChoices(data[currentQuiz]);
  data.map(async (data, i) => {
    // await clearChoices()
    let isOk = false;

    // const isCollect = await fetchJSON("/api/getAnswer", getCurrChoice())
    // if (isCollect) {
    //     // ウィンドウを開いてまる　！
    //     // ウィンドウを開いてばつ　！
    // }

    // submit されたらクリアー
    const submitButton = getElement("submitButton");
    submitButton.addEventListener("click", () => {});

    if (isOk) await clearChoices();
  });
};
