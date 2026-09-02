# プログラミング論及び演習（2026年度）

大妻女子大学　社会情報学部　情報デザイン専攻　後期・金曜

**授業資料 → https://kofujimura.github.io/otsuma-programming-lecture/**

この資料が教科書です。学生は毎回の授業でこのURLを開きます。

## 構成

| | 内容 |
|---|---|
| `index.html` | 授業資料の本体（全15回）。ファイル1つで完結し、外部ライブラリに依存しない |
| `samples/` | CodeSandboxで配布するサンプルコード。詳細は [samples/README.md](samples/README.md) |
| `favicon.svg` `favicon.png` | タブに出るアイコン。`favicon.png` は `favicon.svg` から書き出したもの |

## 編集のしかた

`index.html` を直接編集して push すれば、GitHub Pages に反映されます。
ビルドは不要です。

日付・教員名・SA名・スケジュールは、ファイル冒頭の
`<script id="course-data" type="application/json">` にまとめてあります。
**来年度はここの日付を書き換えるだけ**で、本文に触れる必要はありません。

編集後は、ブラウザで開いて表示を確認してください。特にコードブロック内は
`<` `>` を `&lt;` `&gt;` と書く必要があります。

画面右上のボタンで、明るい配色と暗い配色を切り替えられます。
選んだ設定はブラウザに保存されます。何も選んでいないうちは、
OSの設定（ダークモードかどうか）にそのまま従います。

## 他の先生と共有する場合

非常勤講師の方など、この資料に独自に手を入れて使いたい、かつ
こちらの修正も取り込みたい、という場合の進めかたです。

**最初に、GitHub の Fork ボタンでコピーを作ってもらってください。**
手元にファイルをコピーして別リポジトリを作る方法でも動きますが、
履歴が繋がらないため、あとから修正を取り込むのが面倒になります。

fork したリポジトリで GitHub Pages を有効にすれば、その先生の授業用の
URL（`https://<アカウント名>.github.io/otsuma-programming-lecture/`）が
そのまま手に入ります。

### こちらの修正を取り込む（fork 側の作業）

一度だけ、こちらを upstream として登録します。

```bash
git remote add upstream https://github.com/kofujimura/otsuma-programming-lecture.git
```

以後、取り込むときは毎回これだけです。

```bash
git fetch upstream
git log --oneline HEAD..upstream/main   # 何が増えたかを先に見る
git merge upstream/main
```

`rebase` ではなく `merge` を使ってください。rebase だと自分のコミット1つずつで
衝突を解きなおすことになり、巨大な HTML 1枚では手間が増えるだけです。

特定の修正だけ欲しいときは `git cherry-pick <コミットのハッシュ>` が使えます。

GitHub の画面にある **Sync fork** ボタンは使わないでください。独自の変更があると
自動同期できず、状況によっては「Discard commits」（自分の変更を捨てる）しか
出ないことがあります。

すでにコピーで始めてしまっていた場合は、初回だけ
`git merge upstream/main --allow-unrelated-histories` とします。共通の祖先が
無いため `index.html` 全体が衝突しますが、一度解いて commit すれば履歴が繋がり、
次回からは上と同じ手順で済みます。

### 衝突したときの決めごと

`course-data` は fork 側もこちら側も毎年書き換えるので、必ず衝突します。
**ここは常に fork 側を採用**してください。逆に、本文への改良を
`course-data` の外に置いておくと、取り込みがそのぶん楽になります。

git を使わずに済ませることもできます。こちらの `index.html` を丸ごと受け取り、
冒頭の `course-data` だけを自分のものに差し替えて、ブラウザで開いて確認する。
fork 側の変更が `course-data` の中だけなら、これで足ります。

## 授業で使うサーバ

LLM API と Google Books API は、授業用のプロキシサーバを経由して呼び出します。
APIキーはサーバ側にのみ置き、学生には配りません。

- トークン発行ページ: https://otsuma-llm-gateway-umber.vercel.app

## 授業の構成

第３回から第９回までが「データの形を設計する」という一本の流れになっています。

> じゃんけん → クイズ → 診断チャート → API取得 → AI生成

扱うアプリは毎回変わりますが、データの形はずっと同じで、
変わるのは「データがどこから来るか」だけです。
第10回・第11回でアルゴリズムと3Dを扱い、第12回から総合課題の制作に入ります。
