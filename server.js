import { Server } from "https://js.sabae.cc/Server.js";
import { JSONDB } from "https://js.sabae.cc/JSONDB.js";
import { fetchJSON } from 'https://js.sabae.cc/fetchJSON.js';

class QuizServer extends Server {
    api(path, req) {
        switch(path) {
            case "/api/tests" :
                console.log(req);
                const reqJson = JSON.parse('{"' + decodeURI(req.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
                console.log(reqJson);
                return reqJson;
            case "/api/questions":
               const res = new JSONDB("json/questions.json");
               return res.data;
        }
        
    }
}
new QuizServer(8001);