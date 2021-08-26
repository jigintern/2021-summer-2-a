import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js"

let session_id=localStorage.getItem("session_id");
console.log(session_id)
session_id=await fetchJSON("/api/getSessionId",{session:session_id});
session_id=String(session_id);
localStorage.setItem("session_id",session_id);
console.log(session_id);

let start = document.getElementById("start");
let option = document.getElementById("option");
let input =document.getElementById("inputNickname")
start.addEventListener("click", () => {
  location.href = "../main.html";
}, false);
option.addEventListener("click", () => {
  location.href = "../option.html";
});

function changeNickname() {
  console.log("inputButton was pushed");
  const nickname = document.getElementById("recentNickname");
  let input = document.getElementById("inputNickname");

  if (input.value == "") {
    sampleArea.innerHTML = "名前が入力されていません";
  } else {
  }
}