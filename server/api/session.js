import { JSONDB } from "https://js.sabae.cc/JSONDB.js";

const USERS_JSON_PATH = "./server/json/users.json";

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

export function getUser(sessionId) {
    if (!sessionId) {
        return null;
    }
    const users = new JSONDB(USERS_JSON_PATH);
    return users.data.find(u => u.session_id == sessionId);
}

export function saveUserName(sessionId, name) {
    if (!sessionId || !name) {
        return null;
    }
    let users = new JSONDB(USERS_JSON_PATH);
    let user = users.data.find(u => u.session_id == sessionId);
    user.name = name;
    users.write();
    return "ok";
}