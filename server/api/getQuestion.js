import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
/**
 * ユーザーIDから指定された数の問題を返すAPI。
 * 
 * 引数
 * @argument {json} user ユーザーIDのみ入ったjsonデータ。
 * 返り値
 * @param {json} get_question user_setting.jsonの問題量分の問題が出る。
 * 
 * 注意！！
 * @function saveUserSetting ・・・user_setting.jsonの問題数(question_volume)を変更
 *           
 * @function getQuestion ・・・user_setting.jsonの問題数(question_volume)を調べる
 *  ２つの関数の実行順序に気をつけてください。
 */

//*引数のデータ：user
/*
{
    "sessionId":"025110"
} 
*/

//欲しいデータの件数→user-setting.jsonからnumとして取得
export function getQuestion(user) {
    const question_json =new JSONDB("./server/json/questions.json");
    const setting_json=new JSONDB("./server/json/user_setting.json");   
    //データ件数numを取得。
    let user_check=setting_json.data.user_setting.find(ele=>ele.sessionId==user.sessionId);
    if (!user_check) {
        return "User Not Found";
    }
    let user_index=setting_json.data.user_setting.indexOf(user_check);
    let num=setting_json.data.user_setting[user_index].question_volume;
    /***シャッフル***/
    let shuffle_question=new Array(num);
    for (let i = 0; i < num; i++) {
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

