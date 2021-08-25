import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

/**
 * @param {int} num  欲しい件数の番号データ件数
 */
const POSTquestions =  (num) => {
    const post=new JSONDB("../json/questions.json");
    // TODO 下のエラー処理は後で書く。
    // if (num>post.quizData.read().length) {
    //     //numがjSONの長さより大きすぎたとき、
    //     return "Error: 件数の入力が問題データ件数を超えている。"
    // }
    let shuffle_question=new Array(num);
    /***シャッフル***/
    for (let i = 0; i < num; i++) {
        shuffle_question[i]=post.quizData[Math.floor(Math.random()*num)];
    }
    /****************/

    return shuffle_question; 
    // console.log(shuffle_question);
}

export { POSTquestions }