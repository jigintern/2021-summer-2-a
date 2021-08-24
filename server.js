import { Server } from "https://js.sabae.cc/Server.js";
import { JSONDB } from "https://js.sabae.cc/JSONDB.js";


class QuizServer extends Server {
    api(path, req) {
        if (path == "/api/test") {
            return "test"
        }
    }
}
//User
//Session IDを保存してフロントエンドに渡す。
//
new QuizServer(8001);