import { JSONDB } from "https://js.sabae.cc/JSONDB.js";

/**
 * 問題を返す
 * ユーザー設定が取得できた場合は設定された件数分返す（デフォ5件）
 * @param {number} sessionId 
 * @returns 
 */
export function getQuestion(sessionId) {
    const question_json =new JSONDB("./server/json/questions.json");
    const setting_json=new JSONDB("./server/json/user_setting.json");   
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
    /***シャッフル***/
    let shuffle_question=new Array(limit);
    for (let i = 0; i < limit; i++) {
        shuffle_question[i]=question_json.data.quizData[Math.floor(Math.random()*question_json.data.quizData.length)];
    }
    /****************/
    // 問題から回答のみ削除
    const get_question = shuffle_question.map((data) => {
        delete data.answerId;
        delete data.explanation;
        return data;
    });

    return get_question; 
}

