import { JSONDB } from "https://js.sabae.cc/JSONDB.js";

/**
 * ユーザーIDからIDと問題数を返す関数。
 * 
 * @param {number} sessionId 
 * @returns {json} {"sessionId":,"question_volume":} セッションIDと問題数
 */
//入力はsessionId
//出力はsessionIdと問題数
export function getUserSetting(sessionId) {
    const save_json = new JSONDB("./server/json/user_setting.json");
    return save_json.data.find(ele=>ele.sessionId == sessionId);    
}
