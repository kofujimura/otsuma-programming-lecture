"use strict";

// 診断チャートのデータ
//   質問ノードは choices を持ち、終端ノードは result を持つ
//   選択肢は最初から配列。Yes/No は「選択肢が2つの場合」にすぎない
const chart = {
  q1: {
    question: "デザインよりプログラミングが好き",
    choices: [
      { text: "はい", next: "q2" },
      { text: "いいえ", next: "q3" },
    ],
  },
  q2: {
    question: "データ分析にも興味がある",
    choices: [
      { text: "はい", next: "t3" },
      { text: "いいえ", next: "q4" },
    ],
  },
  q3: {
    question: "3DCGより動画を制作したい",
    choices: [
      { text: "はい", next: "q4" },
      { text: "いいえ", next: "t1" },
    ],
  },
  q4: {
    question: "ロボット開発に興味がある",
    choices: [
      { text: "はい", next: "t4" },
      { text: "いいえ", next: "t2" },
    ],
  },

  // 終端（結果）。すべて同じ形にそろえておく
  t1: { result: "あなたはタイプN（グラフィックデザイン志向）です", image: null },
  t2: { result: "あなたはタイプT（映像制作志向）です", image: null },
  t3: { result: "あなたはタイプF（データサイエンティスト志向）です", image: null },
  t4: { result: "あなたはタイプM（機械工学志向）です", image: null },
};

const questionEl = document.querySelector("#question");
const choicesEl = document.querySelector("#choices");
const resultEl = document.querySelector("#result");
const backBtn = document.querySelector("#back");

let state = "q1"; // 現在の状態
let history = []; // 通ってきた状態（戻る機能のため）

function show() {
  const node = chart[state];
  resultEl.textContent = "";
  choicesEl.innerHTML = "";
  backBtn.disabled = history.length === 0;

  if (node.choices) {
    // 質問ノード：選択肢のボタンをデータから作る
    questionEl.textContent = node.question;

    node.choices.forEach(function (choice) {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.addEventListener("click", function () {
        history.push(state); // 今の状態を記録してから
        state = choice.next; // 次の状態へ移る
        show();
      });
      choicesEl.appendChild(btn);
    });
  } else {
    // 終端ノード：結果を表示する
    questionEl.textContent = "お疲れさまでした";
    resultEl.textContent = node.result;
    if (node.image) {
      resultEl.innerHTML += `<br><img src="${node.image}" width="200">`;
    }
  }
}

backBtn.addEventListener("click", function () {
  if (history.length > 0) {
    state = history.pop(); // 最後に記録した状態を取り出す
    show();
  }
});

show();
