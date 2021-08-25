import { JSONDB } from "https://js.sabae.cc/JSONDB.js";

const USERS_JSON_PATH = "./server/json/users.json";

/**
 * セッション情報を取得
 * idが指定されていない or idがjsonに無い場合は新しく発行する
 * 
 * @param {number}} id 
 * @returns 
 */
export function getSession(id) {
    let users = new JSONDB(USERS_JSON_PATH);

    let user;
    if (id) {
        user = users.data.find(u => u.session_id == id);
    }
    if (!user) {
        let session = Math.random();
        user = {
            name: "",
            session_id: session
        };
        users.data.push(user);
        users.write();
    }
    return user.session_id;
}

/**
 * ユーザーを取得
 * 
 * @param {number} sessionId 
 * @returns 
 */
export function getUser(sessionId) {
    if (!sessionId) {
        return null;
    }
    const users = new JSONDB(USERS_JSON_PATH);
    return users.data.find(u => u.session_id == sessionId);
}

/**
 * ニックネームを保存
 * req.sessionとreq.nameは必須
 * 
 * @param {any} req 
 * @returns 
 */
export function saveUserName(req) {
    if (!req.session || !req.name) {
        return null;
    }
    let users = new JSONDB(USERS_JSON_PATH);
    let user = users.data.find(u => u.session_id == sessionId);
    if (!user) {
        return null;
    }
    user.name = req.name;
    users.write();
    return "ok";
}