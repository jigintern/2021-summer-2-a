import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
/**
 * ユーザーIDとユーザーの解答状況をサーバー側に保存するAPI。
 * 
 * 引数
 * @argument {number} session_id
 * @argument {any} answers クイズIDとユーザーの解答結果を保存しているJSON 
 */
//*もらってくるデータの仮定
/*
answers
{
    "answers" [
        {
            "quizId":1,
            "userans":"true"
        },
        {
            "quizId":2,
            "userans":"OK"
        }
    ]
}
*/

const USERS_ANSWERS_PATH = "./server/json/users_answers.json";
const QUESTIONS_PATH = "./server/json/questions.json";

//*解答を保存するAPI
//*フロント側で解答を集計→サーバーに渡す→users_answers.jsonに保存
export function saveAnswer(sessionId, answers) {
    if (!sessionId || !answers) {
        return;
    }
    console.log(answers);
    let usersAnswers = new JSONDB(USERS_ANSWERS_PATH);
    let usersAnswer = {
        user_session_id: sessionId,
        answer_count: null,
        answers: answers
    }

    let maxAnsCount = 0;
    usersAnswers.data.forEach(e => {
        if (e.user_session_id == sessionId) {
            maxAnsCount = maxAnsCount < e.answer_count ? e.answer_count : maxAnsCount;
        }
    });
    usersAnswer.answer_count = ++maxAnsCount;

    usersAnswers.data.push(usersAnswer);
    usersAnswers.write();

    return "ok";
}

/**
 * 指定されたユーザーの最新の解答結果を返す
 * 
 * @param {number} sessionId 
 * @returns 
 */
export function getUserLatestAnswer(sessionId) {
    if (!sessionId) {
        return;
    }

    const usersAnswers = new JSONDB(USERS_ANSWERS_PATH);
    const questions = new JSONDB(QUESTIONS_PATH);
    let usersLatestAnswer;
    let maxAnsCount = 0;
    usersAnswers.data.forEach(e => {
        if (e.user_session_id != sessionId) {
            return;
        }
        if (maxAnsCount < e.answer_count) {
            usersLatestAnswer = e;
        }
    });

    usersLatestAnswer.answers.forEach(e => {
        const quizId = e.quizId;
        let quiz = questions.data.quizData.find(q => q.quizId == quizId);
        if (quiz) {
            e.statement = quiz.statement;
            e.correct = e.amswer == quiz.answerId;
        }
    });

    return usersLatestAnswer;
}

