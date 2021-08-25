import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
let json = new JSONDB("./server/json/questions.json");

const getAnswer = ({ quizId }) => {

    const l = json.data.quizData.length;//クイズデータの要素数
    
    for (let i = 0; i < l; i++) {
        // 送られてきたクイズの番号と一致するクイズを見つける
        if (quizId==json.data.quizData[i].quizId) {
            // クイズの答えの番号と解説を返す
            return {
                explanation: json.data.quizData[i].explanation,
                answerId: json.data.quizData[i].answerId
            }
        }
    }

}

export { getAnswer }