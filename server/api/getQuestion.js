import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";
/**
 * @param {int} num  欲しい件数の番号データ件数
 */
export function getQuestion(num) {
    
    const json =new JSONDB("./server/json/questions.json");
    // TODO 下のエラー処理は後で書く。
    // if (num>post.quizData.read().length) {
    //     //numがjSONの長さより大きすぎたとき、
    //     return "Error: 件数の入力が問題データ件数を超えている。"
    // }
    let shuffle_question=new Array(num);
    let a=0;
    /***シャッフル***/
    for (let i = 0; i < num; i++) {
        a=Math.floor(Math.random()*num);
        shuffle_question[i]=json.data.quizData[Math.floor(Math.random()*num)];
    }
    /****************/

    return shuffle_question; 
}

