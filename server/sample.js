import { JSONDB } from "https://js.sabae.cc/JSONDB.js";

export function getSample(limit) {

    let json = new JSONDB("./server/json/questions.json");
    const data = json.data;
    console.log(json.data.quizData.length);
    data.quizData = random(data.quizData);
    return data;
}

/**
 * 配列をランダムで並び替えする
 * @param {*} array 
 * @returns 
 */
function random(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        const tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}