import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
/**
 * ユーザーIDと問題数をサーバー側に保存するAPI。
 * 
 * 引数
 * @argument {json} json ユーザーIDと問題数が入ったJSON。
 */

//*引数データの例:json
/*
{
    "sessionId":"025110",
    "question_volume":10
}
*/
export function saveUserSetting(json) {
    const save_json=new JSONDB("./server/json/user_setting.json");
    let check=save_json.data.user_setting.find(ele=>ele.sessionId==json.sessionId)
    if (check) {
        //同じユーザーID→上書き
        let index=save_json.data.user_setting.indexOf(check);
        save_json.data.user_setting[index].question_volume=json.question_volume;
        save_json.write();
    } else {
        save_json.data.user_setting.push(json);
        save_json.write();
    }
}