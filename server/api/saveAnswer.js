import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
/**
 * ユーザーIDとユーザーの解答状況をサーバー側に保存するAPI。
 * 
 * 引数
 * @argument {string} session_id
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

//*解答を保存するAPI
//*フロント側で解答を集計→サーバーに渡す→users_answers.jsonに保存
export function saveAnswer(sessionId, answers) {
    let usersAnswers = new JSONDB(USERS_ANSWERS_PATH);
    let usersAnswer = {
        user_session_id: sessionId,
        answer_count: null,
        answers: answers.answers
    }

    let maxAnsCount = 0;
    usersAnswers.data.forEach(e => {
        maxAnsCount = maxAnsCount < e.answer_count ? e.answer_count : maxAnsCount;
    });
    usersAnswer.answer_count = ++maxAnsCount;

    usersAnswers.data.push(usersAnswer);
    usersAnswers.write();

    return "ok";
}

