import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
//入力：sessionID
//出力：ユーザーの設定を返す。{"sessionId":"025110","question_volume":10}
export function getUserSetting(json) {
    const save_json=new JSONDB("./server/json/user_setting.json");
    let check=save_json.data.user_setting.find(ele=>ele.sessionId==json.sessionId)
    let index=save_json.data.user_setting.indexOf(check);
}