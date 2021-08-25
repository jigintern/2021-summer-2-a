import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

let state = new Map();

const removeElement = (selector) => {
  document.querySelector(selector).innerHTML = "";
};

const getElement = (id) => document.getElementById(id);

const setQuizList = (data) => {
  data.map((a, i) => {
    if (i !== data.length - 1) {
      a.nextId = data[i + 1]["quizId"];
    }
    return a;
  });
  state.set("quizList", data);
};

const getQuizList = () => state.get("quizList");
const setCurrentChoice = (data) => state.set("currentChoice", data);
const getCurrentChoice = () => state.get("currentChoice");
const setCurrentQuiz = (data) => state.set("currentQuiz", data);
const getCurrentQuiz = () => state.get("currentQuiz");

const createChoices = ({ choices }) => {
  choices.map(({ text, id }) => {
    const choiceBtn = document.createElement("button");
    const crrElId = `choices_${id}`;

    choiceBtn.setAttribute("id", crrElId);
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.innerText = text;

    getElement("choicesContainer").appendChild(choiceBtn);

    const nowChoiceBtn = getElement(crrElId);
    nowChoiceBtn.addEventListener("click", () => {
      setCurrentChoice(id);
    });
  });

  return;
};

window.onload = async () => {
  setQuizList(await fetchJSON("/api/getQuizList"));
  setCurrentQuiz(getQuizList()[0]);
  loopQuiz(getCurrentQuiz());
};

const loopQuiz = (nowQuiz) => {
  createChoices(nowQuiz);

  const submitButton = getElement("submitButton");

  submitButton.addEventListener("click", () => {
    const nextId = nowQuiz.nextId;
    const nextQuiz = getQuizList().find((a) => a.quizId === nextId);
    if (nextQuiz) {
      removeElement("#choicesContainer");
      loopQuiz(nextQuiz);
    } else {
      endOfGame();
    }
  });
};
