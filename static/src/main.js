import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";
import {
  removeElement,
  getElement
} from './utils/util.js'

let state = new Map();

const setQuizList = (data) => {
  data.map((a, i) => {
    if (i !== data.length - 1) {
      a.nextId = data[i + 1]["quizId"];
    } else {
      a.nextId = 999
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
  state.set("answers", newAnswers)
}
const getAnswers = () => state.get("answers")
const initAnsList = () => state.set(
  "answers",
  getQuizList().map(({ quizId }) => ({ quizId, answer: 999 }))
)

const hideChoices = () => {
  $("choicesContainer").hide()
}
const createChoices = ({ choices }) => {
  choices.map(({ text, id }) => {
    const choiceBtn = document.createElement("button");
    const crrElId = `choices_${id}`;

    choiceBtn.setAttribute("id", crrElId);
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.innerText = text;

    getElement("choicesContainer").appendChild(choiceBtn);

    getElement(crrElId).onclick = () => {
      setCurrentChoice(id);
    }
  });

  return;
};

const end = () => {

}

window.onload = async () => {
  await setQuizList(await fetchJSON("/api/getQuizList"));
  await initAnsList(initAnsList)
  await setCurrentQuiz(getQuizList()[0])
  await loopQuiz(getCurrentQuiz())
};

const loopQuiz = async (nowQuiz) => {
  
  createChoices(nowQuiz);
  
  visibility("choicesContainer", true)
  visibility("submitButton", true)
  visibility("nextButton", false)

  getElement("submitButton").onclick = async () => {
    visibility("choicesContainer", false)
    visibility("submitButton", false)
    visibility("nextButton", true)
    setAnswers({
      id: nowQuiz.quizId,
      currAns: getCurrentChoice(),
    })

    const { explanation, answerId } =await fetchJSON("/api/getAnswer", {
      quizId: nowQuiz.quizId
    })
    // // ボタンを無効化するタグ
    // visibility("choicesContainer", false)
    const choiceText = nowQuiz.choices.find(a => a.id === answerId).text
    getElement("explanation").innerText = explanation
    getElement("answer").innerText = choiceText
  };

  getElement("nextButton").onclick = async () => {
    const nextId = nowQuiz.nextId;
    const nextQuiz = getQuizList().find((a) => a.quizId === nextId);
    if (nextQuiz) {
      removeElement("#choicesContainer");
      visibility("submitButton", false)
      visibility("nextButton", true)
      loopQuiz(nextQuiz);
    } else {
      endOfGame();
    }
  }
};

const visibility = (el, isVisible) => {
  isVisible
    ? getElement(el).style.display = "block"
    : getElement(el).style.display = "none"
}
