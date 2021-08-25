import { JSONDB } from "https://js.sabae.cc/JSONDB.js";

export function getSample(limit) {

    let json = new JSONDB("./server/json/questions.json");
    console.log(json);
    return json.data;

}