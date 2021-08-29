import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
import { uniq } from "../util/util.js"

const question_json = new JSONDB("./server/json/questions.json");
const setting_json = new JSONDB("./server/json/user_setting.json"); 

/**
 * 問題を返す
 * ユーザー設定が取得できた場合は設定された件数分返す（デフォ5件）
 * @param {number} sessionId 
 * @returns 
 */
export function getQuestion(sessionId) {
    //データ件数numを取得。
    let setting;
    if (sessionId) {
        setting = setting_json.data.find(ele => ele.sessionId == sessionId);
    }
    let limit = 0
    if (!setting) {
        limit = 5;
    } else {
        limit = setting.question_volume;
    }

    let shuffled;
    for (; ;) {
        let shuffle_question = new Array(Number(limit));

        /***シャッフル***/
        for (let i = 0; i < limit; i++) {
            shuffle_question[i]=question_json.data.quizData[Math.floor(Math.random()*question_json.data.quizData.length)];
        }

        // 重複した問題があると弾く
        // 弾いた結果limit以下ならもう一度データを取得し直す
        const uniqed = uniq(shuffle_question)
        if (uniqed.length == limit) {
            shuffled = uniqed
            break
        }
    }

    /****************/
    // 問題から回答のみ削除
    const get_question = shuffled.map((data) => {
        delete data.answerId;
        delete data.explanation;
        return data;
    });

    let q = get_question.slice(-1)[0];
    console.log(q);
    q.lastQuestion = true;

    return get_question;
}
