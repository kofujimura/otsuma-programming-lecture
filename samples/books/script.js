"use strict";

// 授業用サーバ（プロキシ）のエンドポイント
//   本来の宛先: https://www.googleapis.com/books/v1/volumes
//   APIキーはサーバ側で付与されるので、ここには書かない
//
//   ※ Google Books はキーなしでは呼び出せなくなりました。
//      キーなしのリクエストは世界中で1つの枠を共有していて、常に枯渇しています。
const BOOKS_API = "https://otsuma-llm-gateway-umber.vercel.app/api/books";

// ネットワークが不調なときは、保存しておいた検索結果を使う
// const BOOKS_API = "result.json";

const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchInput");
const resultsDiv = document.querySelector("#results");

searchButton.addEventListener("click", function () {
  const word = searchInput.value.trim();
  if (word === "") {
    resultsDiv.innerHTML = "<p>キーワードを入力してください</p>";
    return;
  }
  searchBooks(word);
});

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") searchButton.click();
});

async function searchBooks(word) {
  const url = BOOKS_API + "?q=" + encodeURIComponent(word) + "&maxResults=20";

  searchButton.disabled = true;
  resultsDiv.innerHTML = "<p>検索中です…</p>";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error ?? "検索に失敗しました");
    }

    // ★ 外から来た形を、自分のアプリの形に変換する
    //    items が無い、表紙が無い、著者が無い本が普通にあるので ?. と ?? で備える
    const books = (data.items ?? []).map(function (item) {
      const info = item.volumeInfo;
      return {
        title: info.title ?? "タイトル不明",
        authors: info.authors ?? ["著者不明"],
        cover: info.imageLinks?.thumbnail ?? "noimage.png",
      };
    });

    // ここから先は、第３回からずっと同じ [{ }, { }] の世界
    showBooks(books);
  } catch (error) {
    resultsDiv.innerHTML = `<p class="error">検索できませんでした：${error.message}<br>
      少し待ってからもう一度お試しください。</p>`;
    console.error(error);
  } finally {
    searchButton.disabled = false;
  }
}

function showBooks(books) {
  if (books.length === 0) {
    resultsDiv.innerHTML = "<p>見つかりませんでした</p>";
    return;
  }

  resultsDiv.innerHTML = books
    .map(function (b) {
      return `<div class="card">
        <img src="${b.cover}" alt="${b.title}">
        <h3>${b.title}</h3>
        <p>${b.authors.join("、")}</p>
      </div>`;
    })
    .join("");
}
