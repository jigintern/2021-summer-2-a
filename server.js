import { Server } from "https://js.sabae.cc/Server.js";
import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
import { POSTquestions } from "./server/api/POSTquestions.js";

const questions = new JSONDB("./server/json/questions.json");
// const results = new JSONDB("./server/json/result.json")

class QuizServer extends Server {
  api(path, req) {
    switch (path) {
      case "/api/start":
      case "/api/getQuizList": // クイズ一覧を取得
        
        // getQuizList()
        // DBからクイズ一覧を取得
        const { quizData } = questions.data;

        // 問題から回答のみ削除
        const currentQuestions = quizData.map((data) => {
          delete data["answerId"];
          return data;
        });
        // 順番をランダムにする
        // 一定の問題数に絞る

        // 回答をのぞいた問題リストを返す。
        return currentQuestions;
      case "/api/getAnswer": // クライアントから送られた回答が正解かどうかを返す。
      case "/api/getAnswers": // 回答一覧を取得
        const ansList = questions.data;
        return ansList;
      case "/api/postResult": // 今回の結果をサーバへポスト
        // フロントからPOSTされた結果からスコアを算出

      // 算出したスコアをresultdbに書き込み
      case "/api/getRanking":
        // resultからソートしたデータをフロントへ返す
      case "/api/POST":
        POSTquestions();
    }
  }
}

new QuizServer(8001);
