import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";
let input = document.getElementById("inputQuestion");
let exit = document.getElementById("exit");
let fiveButton=document.getElementById("fiveQuestion");
let tenButton=document.getElementById("tenQuestion");
let twentyButton=document.getElementById("twentyQuestion");

window.onload = async () => {
    const nowSession = localStorage.getItem("session_id")
    const setting = await fetchJSON("/api/getUserSetting", { session: nowSession });
    input.value=setting.question_volume;
  };
  

fiveButton.onclick=()=>{
    input.value=5;
}
tenButton.onclick=()=>{
    input.value=10;
}
twentyButton.onclick=()=>{
    input.value=20;
}
exit.onclick = async() => {
    fetchJSON("/api/saveUserSetting", { sessionId: localStorage.getItem("session_id"), question_volume: input.value });
    location.href='./index.html';
}