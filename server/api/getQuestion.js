import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";
/**
 * @param {int} num  欲しい件数の番号データ件数
 */
export function getQuestion(num) {
    const json =new JSONDB("./server/json/questions.json");
    let shuffle_question=new Array(num);
    /***シャッフル***/
    for (let i = 0; i < num; i++) {
        shuffle_question[i]=json.data.quizData[Math.floor(Math.random()*json.data.quizData.length)];
    }
    /****************/
    // 問題から回答のみ削除
    const get_question = shuffle_question.map((data) => {
        delete data.answersId;
        delete data.explanation;
        return data;
    });

    return get_question; 
}

