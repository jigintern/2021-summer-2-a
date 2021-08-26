import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
/**
 * クイズIDとユーザーの解答と正誤から評価コメントを返す関数。
 * 
 * 引数
 * @argument {json} get_json クイズIDとユーザーの答えと正解の判定が入ったJSON。
 * 返り値
 * @param {json} comment 解答結果についてのコメント
 */
//*引数データの例：get_json
/*
{
    "key":[
        {
            "quizid":11,
            "userans":"aple",
            "userresult":"NO"
        },
        {
            "quizid":12,
            "userans":"false",
            "userresult":"OK"
        },
    ],
    "nickname":"asdifwif"
}
*/

export function getComments(get_json) {
    // const get_json =fetchJSON("api/test");  //フロントから解答結果とニックネームのデータをもらう。
    const comment_json=new JSONDB("./server/json/comments.json");
    let count=0;    //正解数のカウント
    for (let i = 0; i < get_json.key.length; i++) {
        if (get_json.key[i].userresult=="OK") {
            count++;
        }
    }
    //* 評価の判定（問題数などで変更する予定あり）
    let comment="";
    if (count<3) {
        comment=comment_json.data.comments[0].comm;
    } else if (3<=count<5) {
        comment=comment_json.data.comments[1].comm;        
    } else if (5<=count<7) {
        comment=comment_json.data.comments[2].comm;                
    }
    return comment;
}

