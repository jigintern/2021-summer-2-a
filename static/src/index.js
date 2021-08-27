import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";
import { getSessionId } from './utils/util.js'

let session_id = getSessionId();
session_id = await fetchJSON("/api/getSessionId", { session: session_id });
session_id = String(session_id);
localStorage.setItem("session_id", session_id);

let start = document.getElementById("start");
let option = document.getElementById("option");
let input = document.getElementById("inputNickname");

const user = await fetchJSON("/api/getUser", {session: session_id});
input.value = user.name;

start.onclick = async () => {
  if (input.value != "") {
    await fetchJSON("/api/saveUserName", {
      name: input.value,
      session: session_id,
    });
  }
  location.href = "./main.html";
};

function changeNickname() {
  const nickname = document.getElementById("recentNickname");
  let input = document.getElementById("inputNickname");

  if (input.value == "") {
    sampleArea.innerHTML = "名前が入力されていません";
  } else {
  }
}
