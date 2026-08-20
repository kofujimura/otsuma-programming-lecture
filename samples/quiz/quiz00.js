"use strict";

// 問題のデータ（オブジェクトの配列）
//   answer は choices の何番目が正解かを 0 から数えた番号
//   第８回でAIに作らせるときも、まったく同じ形を指定します
const quizData = [
  {
    question: "通るときには閉まって、通らないときには開いているものは何？",
    choices: ["踏み切り", "洗濯機", "冷蔵庫"],
    answer: 0,
  },
  {
    question: "話すことがとても好きな道具は何？",
    choices: ["スプーン", "シャベル", "しゃもじ"],
    answer: 2,
  },
  {
    question: "世界の真ん中にいる虫は何？",
    choices: ["てんとう虫", "カマキリ", "蚊"],
    answer: 2,
  },
];

const progressEl = document.querySelector("#progress");
const questionEl = document.querySelector("#questions");
const choicesEl = document.querySelector("#choices");
const feedbackEl = document.querySelector("#answer");
const nextBtn = document.querySelector("#next");

let count = 0; // 今何問目か（0から数える）
let score = 0; // 正解数

function showQuestion() {
  const quiz = quizData[count];

  progressEl.textContent = `問題 ${count + 1} / ${quizData.length}`;
  questionEl.textContent = quiz.question;
  feedbackEl.textContent = "";

  // 選択肢の数はデータが決める。3つでも5つでもこのままで動く
  choicesEl.innerHTML = quiz.choices
    .map(function (text, i) {
      return `<label><input type="radio" name="answer" value="${i}">${text}</label>`;
    })
    .join("");
}

nextBtn.addEventListener("click", function () {
  const picked = document.querySelector('input[name="answer"]:checked');

  if (!picked) {
    feedbackEl.textContent = "選択肢を選んでください";
    return;
  }

  // picked.value は文字列なので、Number() で数値に変換してから === で比較する
  if (Number(picked.value) === quizData[count].answer) {
    feedbackEl.textContent = "正解！";
    score++;
  } else {
    const correct = quizData[count].choices[quizData[count].answer];
    feedbackEl.textContent = `不正解。正解は「${correct}」でした`;
  }

  count++;
  if (count < quizData.length) {
    setTimeout(showQuestion, 900); // 少し待ってから次の問題へ
  } else {
    setTimeout(showResult, 900);
  }
});

function showResult() {
  progressEl.textContent = "";
  questionEl.textContent = "クイズ終了";
  choicesEl.innerHTML = "";
  nextBtn.disabled = true;
  feedbackEl.textContent = `${quizData.length}問中 ${score}問正解`;

  saveHistory(score, quizData.length);
  showHistory();
}

// ---- 成績履歴をローカルストレージに保存する ----
//   localStorage は文字列しか保存できないので JSON にして出し入れする
function saveHistory(score, total) {
  const log = JSON.parse(localStorage.getItem("quizLog") ?? "[]");
  log.push({
    date: new Date().toLocaleString("ja-JP"),
    score: score,
    total: total,
  });
  localStorage.setItem("quizLog", JSON.stringify(log));
}

function showHistory() {
  const log = JSON.parse(localStorage.getItem("quizLog") ?? "[]");
  document.querySelector("#history").innerHTML =
    "<h3>これまでの成績</h3>" +
    log
      .map(function (r) {
        return `<li>${r.date}　${r.total}問中 ${r.score}問正解</li>`;
      })
      .join("");
}

showQuestion();
showHistory();
