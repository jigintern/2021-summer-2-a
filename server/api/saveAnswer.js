import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
/**
 * ユーザーIDとユーザーの解答状況をサーバー側に保存するAPI。
 * 
 * 引数
 * @argument {json} user_json ユーザーIDを格納しているJSON
 * @argument {json} data_json クイズIDとユーザーの解答結果を保存しているJSON 
 */
//*もらってくるデータの仮定
/*
user_json
{
    "userId":"00204502040"
    ※userの名前はif文とかの判定が難しいので考えない。
}
data_json
{
    "answers":[
        {
            "quizId":1,
            "userans":"true"
        },
        {
            "quizId":2,
            "userans":"OK"
        }
    ]
}
*/
//*解答を保存するAPI
//*フロント側で解答を集計→サーバーに渡す→user-result.jsonに保存
export function saveAnswer(user_json,data_json) {
    // const user_json=fetchJSON("api/test");  //フロントからユーザーデータを取得
    // const data_json =fetchJSON("api/test");  //フロントから解答結果のデータをもらう。
    const save_json=new JSONDB("./server/json/users-answer-result.json");
    const user_answer={
        user:user_json.userId,
        answer:data_json.answers
    }
    let check=save_json.data.user_answer_results.find(ele=>ele.user==user_json.userId);
    if(check){
        //すでに入力と同じユーザーが登録されているとき。
        let check_index=save_json.data.user_answer_results.indexOf(check);
        save_json.data.user_answer_results[check_index].answer=user_answer.answer;   
        save_json.write();

    }else{
        save_json.data.user_answer_results.push(user_answer);
        save_json.write();
    }
}

