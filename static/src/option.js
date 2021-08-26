function changeNickname() {
  console.log("inputButton was pushed");
  const sampleArea = document.getElementById("inputButtonClicked");
  const nickname = document.getElementById("recentNickname");
  let input = document.getElementById("inputNickname");

  if (input.value == "") {
    sampleArea.innerHTML = "名前が入力されていません";
  } else {
    nickname.innerHTML = "現在の名前:" + input.value;
    sampleArea.innerHTML = "適用しました";
  }
}
function question(num) {
  let input = document.getElementById("inputQuestion");
  input.value = num;
}
