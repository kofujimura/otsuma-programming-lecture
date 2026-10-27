# 配布用サンプルコード

CodeSandbox に貼り付けて配布するサンプル。教科書（`../index.html`）の
記述と一致させてある。授業前にこちらを更新してから Sandbox へ反映する。

| フォルダ | 回 | 貼り付け先 Sandbox |
|---|---|---|
| `books/`   | 第６回 | https://codesandbox.io/p/sandbox/4jrztk |
| `ai-chat/` | 第７回・第８回 | https://codesandbox.io/p/sandbox/yqnxrn |
| `quiz/`    | 第４回 | https://codesandbox.io/p/sandbox/p83vrc |
| `chart/`   | 第５回 | https://codesandbox.io/p/sandbox/hcv27r |
| `debug/`   | 第１０回 | （未作成） |

## 全体の方針

- エンドポイントは先頭で `const` にまとめ、コメントで本来の宛先を併記
- OpenAI / Google Books のAPIキーはコードに書かない（授業用サーバが付与）
- 通信は必ず `try` / `catch`。失敗時は画面にメッセージを出す
- `localStorage` に入れる値は `JSON.stringify` / `JSON.parse` で往復
- 比較は `===`。DOMから取った値は `Number()` で明示的に変換
- 選択肢の番号は **0から数える**（第４回と第８回で同じ形）

## 各サンプルの要点

### books/（第６回）
キーなしでの Google Books 呼び出しは 2026 年時点で使用不可。授業用サーバ
経由に変更した。`?.` と `??` で表紙・著者の欠落に備えている。
ネットワーク不調時は `BOOKS_API` を `"result.json"` に差し替えれば通信なしで動く。

### ai-chat/（第７回）
Gemini とプロバイダ切り替えを廃止し、授業用トークン方式に統一。
Temperature の設定欄は削除した。「このPCからトークンを消す」ボタンあり
（大学の共用PC対策）。送信中はボタンを無効化し「考え中です…」を表示する。

### ai-chat/quiz.html（第８回）
`response_format: { type: "json_object" }` で JSON を強制し、
`data.choices[0].message.content` を `JSON.parse()` する。
AIが配列を `{"quiz": [...]}` のように包んで返す場合にも対応している。

### quiz/（第４回）
`selections` を `choices` に、`answer` を0始まりに変更。選択肢は
`map().join("")` でデータの長さぶん生成するので、3つでも5つでも動く。
成績履歴を `localStorage` に配列で保存する。

### chart/（第５回）
`yes` / `no` の2択固定から `choices` の配列に変更。選択肢を3つ以上に
増やしてもコードの変更は不要。「一つ前に戻る」を `history` 配列で実装。

### debug/（第１０回）
**わざと壊してある。**8つのボタンに1つずつバグがあり、小テストの出題範囲
（変数宣言、if・演算子、有効範囲、for・配列、DOM、Date、localStorage、
async/await）と1対1に対応する。②と⑥はエラーが出ないバグ。
答えは教科書の第１０回「解説」にある。上の方針（`try` / `catch` など）は
このサンプルには当てはめない。エラーが Console に出なくなるため。
教科書のエラー表示の例（`script.js:52:46`）は⑤の行なので、
行を増減したら教科書側も合わせること。
