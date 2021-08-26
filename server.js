import { Server } from "https://js.sabae.cc/Server.js";
import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
import { getQuestion } from "./server/api/getQuestion.js";
import { getAnswer } from "./server/api/getAnswer.js";
import { getSessionId, getUser, saveUserName, registAdmin, getAdminSessionId, saveAdminName } from "./server/api/session.js";
import { saveAnswer } from "./server/api/saveAnswer.js";
import { getComments } from "./server/api/getComments.js";
import { sample } from "./server/api/sample.js";
import { saveUserSetting } from "./server/api/saveUserSetting.js";
import { getUserSetting } from "./server/api/getUserSetting.js";
const questions = new JSONDB("./server/json/questions.json");
// const results = new JSONDB("./server/json/result.json")

class QuizServer extends Server {
  api(path, req) {
    switch (path) {
      // ユーザー名を設定
      case "/api/saveUserName":
        return saveUserName(req);
      
      // セッション取得
      case "/api/getSessionId":
        return getSessionId(req.session);
      
      //sessionを受け取って設定を返す
      case "/api/getUserSetting":
        const setting = getUserSetting("025110");
        return setting;
      //設定を保持する
      case "/api/saveUserSetting":
          return saveUserSetting(req);
      
      //問題を指定された問題数分取り出す
      case "/api/getQuestion":
        let user_arg={
          "sessionId":"025110"
        }
        return getQuestion(user_arg);  //returnを忘れずに！！
      
      case "/api/getAnswer": // クライアントから送られた回答が正解かどうかを返す。
        const answer = getAnswer(req.quizId);
        return answer;
      
      case "/api/getAnswers": // 回答一覧を取得
        const ansList = questions.data;
        return ansList;
      
      // ユーザーの解答結果を保存する。
      case "/api/saveAnswer":
        let ans_argument={
          "answers":[
              {
                  "quizId":3,
                  "userans":"asdvasdvsdfassf"
              },
              {
                  "quizId":2,
                  "userans":"vaswefefsfdfs"
              }
          ]
        }
        let user_arugument={
          "userId":"00204502040"
        }
        return saveAnswer(user_arugument,ans_argument);
      
      case "/api/postResult": // 今回の結果をサーバへポスト
        // フロントからPOSTされた結果からスコアを算出

      // 算出したスコアをresultdbに書き込み
      case "/api/getRanking":
        // resultからソートしたデータをフロントへ返す
      
      // ユーザーの点数状況からコメントを返す。
      case "/api/getComments":
        let argument={
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
        return getComments(argument);
      
      // ユーザーを取得
      case "/api/getUser":
        return getUser(req.session);
      
      // クイズ登録用ユーザーを登録
      case "/api/registAdmin":
        return registAdmin(req.id, req.pw);
      
      // クイズ登録用ユーザーのセッションIDを取得
      case "/api/getAdminSessionId":
        return getAdminSessionId(req.id, req.pw);
      
      // クイズ登録用ユーザーのニックネームを設定
      case "/api/saveAdminName":
        return saveAdminName(req.ad_session, req.name);
      
      // デバッグ用サンプルコードの実行。
      case "/api/sample":
        return sample({"aiueo":20});  //JSON引数が可能！！
    }
  }
}

new QuizServer(8886);