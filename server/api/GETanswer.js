import { JSONDB } from "https://js.sabae.cc/JSONDB.js";

export function GETanswer(quizNumber) {

    let json = new JSONDB("./server/json/questions.json");
    const l = json.data.quizData.length;//クイズデータの要素数
    console.log(l);
    let answer = [];

    for (let i = 0; i < l; i++) {
        // 送られてきたクイズの番号と一致するクイズを見つける
        if (quizNumber==json.data.quizData[i].quizId) {
            // クイズの答えの番号と解説を返す
            return {
                explanation: json.data.quizData[i].explanation,
                answerId: json.data.quizData[i].answerId
            }
        }
    }

}