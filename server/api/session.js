import { JSONDB } from "https://js.sabae.cc/JSONDB.js";

const USERS_JSON_PATH = "./server/json/users.json";
const ADMIN_JSON_PATH = "./server/json/admin.json";
const USERS_SETTINGS_JSON_PATH = "./server/json/user_setting.json";

/**
 * セッション情報を取得
 * idが指定されていない or idがjsonに無い場合は新しく発行する
 *
 * @param {number} id
 * @returns
 */
export function getSessionId(id) {
  let users = new JSONDB(USERS_JSON_PATH);
  let users_setting = new JSONDB(USERS_SETTINGS_JSON_PATH);

  let user;
  if (id) {
    user = users.data.find((u) => u.session_id == id);
  }
  if (!user) {
    let session = Math.random();
    user = {
      name: "",
      session_id: session,
    };
    let setting={
        sessionId:session,
        question_volume:5
    };
    users.data.push(user);
    users_setting.data.push(setting);
    users.write();
    users_setting.write();
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
  return users.data.find((u) => u.session_id == sessionId);
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
  let user = users.data.find((u) => u.session_id == req.session);
  if (!user) {
    return null;
  }
  user.name = req.name;
  users.write();
  return "ok";
}

/**
 * クイズ登録用のユーザーを登録
 *
 * @param {string} id
 * @param {string} pw
 * @returns
 */
export function registAdmin(id, pw) {
  if (!id || !pw) {
    return null;
  }

  let admins = new JSONDB(ADMIN_JSON_PATH);
  let admin = admins.data.find((a) => a.id == id);
  if (admin) {
    return null;
  }
  const adSessionId = createAdminSessionId();
  admin = {
    id: id,
    pw: pw,
    name: null,
    session_id: adSessionId,
  };
  admins.data.push(admin);
  admins.write();

  return adSessionId;
}

/**
 * クイズ登録用のユーザーのセッションIDを取得
 * 呼ばれる度に新しいセッションIDを発行します
 *
 * @param {string} id
 * @param {string} pw
 * @returns
 */
export function getAdminSessionId(id, pw) {
  if (!id || !pw) {
    return null;
  }
  let admins = new JSONDB(ADMIN_JSON_PATH);
  let admin = admins.data.find((a) => a.id == id && a.pw == pw);
  if (!admin) {
    return null;
  }
  admin.session_id = createAdminSessionId();
  admins.write();
  return admin.session_id;
}

/**
 * クイズ登録用ユーザーのニックネーム登録
 *
 * @param {string} sessionId
 * @param {string} name
 * @returns
 */
export function saveAdminName(sessionId, name) {
  if (!sessionId) {
    return null;
  }

  let admins = new JSONDB(ADMIN_JSON_PATH);
  let admin = admins.data.find((a) => a.session_id == sessionId);
  if (!admin) {
    return null;
  }

  admin.name = name;
  admins.write();
  return "ok";
}

/**
 * クイズ登録用のユーザーのIDを取得
 * クイズ登録のときに使うと便利かもしれない
 *
 * @param {string} adminSessionId
 */
export function getAdminId(adminSessionId) {
  if (!adminSessionId) {
    return null;
  }

  const admins = new JSONDB(ADMIN_JSON_PATH);
  const admin = admins.data.find((a) => a.session_id == adminSessionId);
  if (!admin) {
    return null;
  }
  return admin.id;
}

function createAdminSessionId() {
  return "ad-" + Math.random();
}
