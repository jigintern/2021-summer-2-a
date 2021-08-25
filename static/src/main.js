import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

let state =  new Map()

const setQuizList = (data) => {
  data.map((a, i) => {
    if (i !== data.length - 1) {
      a.nextId = data[i + 1]["quizId"]
    }
    return a
  })
  state.set("quizList", data)
};

const getQuizList = () => state.get("quizList")
const setCurrentChoice = (data) => state.set("currentChoice", data)
const getCurrentChoice = () => state.get("currentChoice")
const setCurrentQuiz = (data) => state.set("currentQuiz", data);
const getCurrentQuiz = () => state.get("currentQuiz")

const getElement = (id) => document.getElementById(id);

const nowData = {
  quizList: [],
  quizId: getCurrentQuiz(),
  choiceId: getCurrentChoice(),
}

const createChoices = ({ choices }) => {
  console.log(choices)
  choices.map(({ text, id }) => {
    const choiceBtn = document.createElement("button");
    const crrElId = `choices_${id}`;

    choiceBtn.setAttribute("id", crrElId);
    choiceBtn.setAttribute("className", "choice");
    choiceBtn.innerText = text;

    getElement("choicesContainer")
      .appendChild(choiceBtn);

    const nowChoiceBtn = getElement(crrElId)
    nowChoiceBtn.addEventListener("click", () => {
      // 現在の選択肢のID
      setCurrentChoice(id);
    });
  });

  return;
};

window.onload = async () => {
  setQuizList(await fetchJSON("/api/getQuizList"))
  console.log(getQuizList())
  setCurrentQuiz(getQuizList()[0])
  loopQuiz(getCurrentQuiz())
}

const clearDatas = () => {
  document.querySelector("#choicesContainer").innerHTML = ''
}

const loopQuiz = (nowQuiz) => {
  // 次のゲームへすすむ処理
  createChoices(nowQuiz)
  console.log("asdfadfas", nowQuiz)

  const submitButton = getElement("submitButton")

  submitButton.addEventListener("click", () => {
    nowData.answerId = getCurrentChoice()
    const nextId = nowQuiz.nextId
    const nextQuiz = getQuizList().find((a) => a.quizId === nextId)
    if (nextQuiz) {
      clearDatas()
      loopQuiz(nextQuiz)
    } else {
      endOfGame()
    }
  })
}
