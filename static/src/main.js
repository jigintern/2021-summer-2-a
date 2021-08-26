import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";
import {
  removeElement,
  getElement,
  getSessionId,
} from './utils/util.js'

const FINAL_QUIZ_ID = 99999

let state = new Map();

const setQuizList = (data) => {
  data.map((a, i) => {
    if (i !== data.length - 1) {
      a.nextId = data[i + 1]["quizId"];
    } else {
      a.nextId = FINAL_QUIZ_ID
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

const createChoices = ({ choices }) => {
  choices.map(({ text, id }) => {
    const container = document.createElement("div")
    const choiceBtn = document.createElement("button");
    const crrElId = `choices_${id}`;

    choiceBtn.setAttribute("id", crrElId);
    choiceBtn.setAttribute("class", "main-choice-button button_unclick");
    choiceBtn.innerText = text;
    container.appendChild(choiceBtn)
    getElement("choicesContainer").appendChild(container);

    getElement(crrElId).onclick = () => {
      setCurrentChoice(id);
    }
  });

  return;
};

const end = async () => {
  const nowSession = getSessionId()
  const answers = getAnswers()
  const a = await fetchJSON("/api/saveAnswer", {
    session: nowSession,
    answers: answers
  })
  console.log(a)
}

window.onload = async () => {
  const nowSession = getSessionId()
  if (!nowSession) {
    location.href = "/"
  }
  getElement("exit").onclick = () => {
    location.href = '/'
  }
  setQuizList(await fetchJSON("/api/getQuestion", { session: nowSession }));
  initAnsList(initAnsList)
  setCurrentQuiz(getQuizList()[0])
  loopQuiz(getCurrentQuiz())
};

const loopQuiz = async (nowQuiz) => {
  getElement("quizStatement").innerText = nowQuiz.statement
  createChoices(nowQuiz);

  visibility("answerContainer", false)
  visibility("choicesContainer", true)
  visibility("submitButton", true)
  visibility("nextButton", false)
  visibility("resultButton", false)

  getElement("submitButton").onclick = async () => {
    const { nextId } = nowQuiz;
    visibility("answerContainer", true)
    visibility("choicesContainer", false)
    visibility("submitButton", false)
    

    if (nextId === FINAL_QUIZ_ID) {
      visibility("resultButton", true)
    } else {
      visibility("nextButton", true)
    }

    setAnswers({
      id: nowQuiz.quizId,
      currAns: getCurrentChoice(),
    })

    const { explanation, answerId } = await fetchJSON("/api/getAnswer", {
      quizId: nowQuiz.quizId
    })

    const choiceText = nowQuiz.choices.find(a => a.id === answerId).text
    getElement("explanation").innerText = explanation
    getElement("answer").innerText = choiceText
  };

  getElement("nextButton").onclick = async () => {
    const nextId = nowQuiz.nextId;
    const nextQuiz = getQuizList().find((a) => a.quizId === nextId);

    removeElement("#choicesContainer");
    visibility("submitButton", false)
    visibility("nextButton", true)
    
    getElement("quizStatement").innerText = ""
    getElement("explanation").innerText = ""
    getElement("answer").innerText = ""
    loopQuiz(nextQuiz);
  }

  getElement("resultButton").onclick = () => {
    location.href = "/result.html"
  }
};

const visibility = (el, isVisible) => {
  isVisible
    ? getElement(el).style.display = "block"
    : getElement(el).style.display = "none"
}
