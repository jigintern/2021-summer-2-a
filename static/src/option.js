import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";
let input = document.getElementById("inputQuestion");
let exit = document.getElementById("exit");
let fiveButton=document.getElementById("fiveQuestion");
let tenButton=document.getElementById("tenQuestion");
let twentyButton=document.getElementById("twentyQuestion");
let setting={
    sessionId:localStorage.getItem("session_id"),
    question_volume:input.value
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

    fetchJSON("/api/saveUserSetting",{json:setting});
    location.href='./index.html';
}