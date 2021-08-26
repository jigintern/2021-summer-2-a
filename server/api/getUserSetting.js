import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
const save_json = new JSONDB("./server/json/user_setting.json");

//入力はsessionId
//出力はsessionIdと問題数
export function getUserSetting(json) {
    let check = save_json.data.user_setting.find(ele=>ele.sessionId);
    let index = save_json.data.user_setting.indexOf(check);
    console.log("あいう");
    console.log(index);

    return {
        sessionId: json,
        question_volume: save_json.data.user_setting[index].question_volume
    }
}
