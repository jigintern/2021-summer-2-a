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
const setAnswers = ({ id, currAns }) => {
  const newAnswers = getAnswers().map((d) => {
    return d.quizId === id
      ? { quizId: d.quizId, amswer: currAns }
      : d
  })
  console.log("new", newAnswers)
  
  state.set("answers", newAnswers)
}
const getAnswers = () => state.get("answers")
const initAnsList = () => state.set(
  "answers",
  getQuizList().map(({ quizId }) => ({ quizId, answer: 999 }))
)

const createChoices = ({ choices }) => {
  choices.map(({ text, id }) => {
    const choiceBtn = document.createElement("button");
    const crrElId = `choices_${id}`;

    choiceBtn.setAttribute("id", crrElId);
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.innerText = text;

    getElement("choicesContainer").appendChild(choiceBtn);

    const nowChoiceBtn = getElement(crrElId);
    nowChoiceBtn.onclick = () => {
      setCurrentChoice(id);
    }
  });

  return;
};

const endOfGame = () => {

}

window.onload = async () => {
  setQuizList(await fetchJSON("/api/getQuizList"));
  initAnsList(initAnsList)
  setCurrentQuiz(getQuizList()[0])
  loopQuiz(getCurrentQuiz())
};

const loopQuiz = (nowQuiz) => {
  createChoices(nowQuiz);

  const submitButton = getElement("submitButton");

  submitButton.onclick = () => {
    setAnswers({
      id: nowQuiz.quizId,
      currAns: getCurrentChoice(),
    })

    fetchJSON("/api/getAnswer", {
      quizId: nowQuiz.quizId
    }).then((d) => {
      //　回答、解説画面
      console.log(d)
    })

    const nextId = nowQuiz.nextId;
    const nextQuiz = getQuizList().find((a) => a.quizId === nextId);
    if (nextQuiz) {
      removeElement("#choicesContainer");
      loopQuiz(nextQuiz);
    } else {
      endOfGame();
    }
  };
};
