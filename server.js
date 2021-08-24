import { Server } from "https://js.sabae.cc/Server.js";
import { JSONDB } from "https://js.sabae.cc/JSONDB.js";

const questions = new JSONDB("./json/questions.json");
// const results = new JSONDB("./json/result.json")

class QuizServer extends Server {
    api(path, req) {
        switch (path) {
            case "/api/getQuizList":　// クイズ一覧を取得
                // getQuizList()
                // DBからクイズ一覧を取得
                const { quizData } = questions.data

                // 問題から回答のみ削除
                const currentQuestions = quizData.map((data) => {
                    delete data["answersId"]
                    return data
                })
                // 順番をランダムにする
                // 一定の問題数に絞る
                
                // 回答をのぞいた問題リストを返す。
                return currentQuestions
        }
    }
}

new QuizServer(8001);