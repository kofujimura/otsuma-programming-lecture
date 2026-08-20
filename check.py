#!/usr/bin/env python3
"""index.html の整合性チェック。編集後に必ず実行する。
   使い方:  python3 check.py"""
import re, sys, json, html as H

h = open('index.html', encoding='utf-8').read()
body = re.sub(r'<script(?![^>]*application/json)[^>]*>.*?</script>', '', h, flags=re.S)
ng = []

# 1. タグの対応
TAGS = ['div','section','p','ul','ol','li','pre','table','thead','tbody','tr','td','th',
        'h1','h2','h3','h4','h5','details','summary','figure','figcaption','svg','code','em','strong']
for t in TAGS:
    o = len(re.findall(r'<' + t + r'[ >]', body))
    c = len(re.findall(r'</' + t + r'>', body))
    if o != c:
        ng.append(f"タグ不一致 <{t}>: 開き{o} / 閉じ{c}")
        # 位置を特定
        st = []
        for m in re.finditer(r'<(/?)' + t + r'[ >]', body):
            if m.group(1) == '/':
                if st: st.pop()
                else: ng.append(f"    余分な </{t}> 行{body[:m.start()].count(chr(10))+1}: …{body[max(0,m.start()-60):m.start()+8][-65:]}")
            else: st.append(m.start())
        for x in st:
            ng.append(f"    未閉じ <{t}> 行{body[:x].count(chr(10))+1}: {body[x:x+65]}")

# 2. アンカーリンク
ids = set(re.findall(r'id="([\w-]+)"', h))
for a in sorted(set(re.findall(r'href="#([\w-]+)"', h))):
    if a not in ids: ng.append(f"リンク切れ: #{a}")

# 3. スケジュールJSON
try:
    d = json.loads(re.search(r'<script id="course-data" type="application/json">(.*?)</script>', h, re.S).group(1))
    nums = [r['n'] for r in d['schedule'] if r['n']]
    if nums != list(range(1, 16)): ng.append(f"授業回が連番でない: {nums}")
except Exception as e:
    ng.append(f"course-data のJSONが不正: {e}")

# 4. コードブロック内に生タグが漏れていないか
for m in re.finditer(r'<pre><code>(.*?)</code></pre>', h, re.S):
    for bad in re.finditer(r'<(?!/?span)', m.group(1)):
        ng.append(f"pre内に生タグ 行{h[:m.start(1)+bad.start()].count(chr(10))+1}")

# 5. 必須要素
if not h.startswith('<meta charset="utf-8">'): ng.append("meta charset がない")

print("\n".join(ng) if ng else "OK: 問題なし")
print(f"---\nサイズ {len(h):,}文字 / コードブロック {h.count('class=\"code\"')}個 / 図 {h.count('<figure')}個")
sys.exit(1 if ng else 0)
