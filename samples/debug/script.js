"use strict";

// デバッグ練習
//   8つのボタンは、どれも正しく動きません。
//   ボタンを押して Console のエラーを読み、このファイルを直してください。
//   ②と⑥はエラーが出ません。画面の説明と見比べて、何がおかしいか考えること。

// ① 押した回数を数える
const count = 0;
document.querySelector("#btn1").addEventListener("click", function () {
  count++;
  document.querySelector("#out1").textContent = `${count} 回`;
});

// ② 点数をランダムに決めて、100点のときだけ「満点！」と出す
document.querySelector("#btn2").addEventListener("click", function () {
  let point = Math.floor(Math.random() * 101);   // 0〜100点
  let message = `${point} 点`;
  if (point = 100) {
    message = `${point} 点　満点！`;
  }
  document.querySelector("#out2").textContent = message;
});

// ③ 押すたびに10点ずつ増える
function addScore() {
  let score = 0;
  score += 10;
}
document.querySelector("#btn3").addEventListener("click", function () {
  addScore();
  document.querySelector("#out3").textContent = `${score} 点`;
});

// ④ 本の一覧を表示する（3冊）
const books = [
  { title: "坊っちゃん", author: "夏目漱石" },
  { title: "銀河鉄道の夜", author: "宮沢賢治" },
  { title: "羅生門", author: "芥川龍之介" },
];
document.querySelector("#btn4").addEventListener("click", function () {
  let html = "";
  for (let i = 0; i <= books.length; i++) {
    html += `<li>${books[i].title}（${books[i].author}）</li>`;
  }
  document.querySelector("#out4").innerHTML = html;
});

// ⑤ 入力した名前で、あいさつを表示する
document.querySelector("#btn5").addEventListener("click", function () {
  const name = document.querySelector("#name").value;
  document.querySelector("out5").textContent = `こんにちは、${name}さん`;
});

// ⑥ 今日の日付を表示する
document.querySelector("#btn6").addEventListener("click", function () {
  const now = new Date();
  document.querySelector("#out6").textContent = `今日は ${now.getMonth()}月${now.getDate()}日です`;
});

// ⑦ メモを保存して、保存した件数を表示する
document.querySelector("#btn7").addEventListener("click", function () {
  const text = document.querySelector("#memo").value;
  const memos = localStorage.getItem("memos") ?? "[]";
  memos.push(text);
  localStorage.setItem("memos", JSON.stringify(memos));
  document.querySelector("#out7").textContent = `${memos.length} 件保存しました`;
});

// ⑧ 犬の写真をランダムに表示する（第９回の Dog CEO API）
document.querySelector("#btn8").addEventListener("click", async function () {
  const res = fetch("https://dog.ceo/api/breeds/image/random");
  const data = await res.json();
  document.querySelector("#out8").src = data.message;
});
