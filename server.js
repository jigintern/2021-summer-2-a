import { Server } from "https://js.sabae.cc/Server.js";

class QuizServer extends Server {
    api(path, req) {
        if (path == "/api/test") {
            return "test"
        }
    }
}
new QuizServer(8001);