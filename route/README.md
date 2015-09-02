Backbone.Router と ES 6 の例
===========================

History API を利用して1つの HTML ファイルで複数の URI ごとのページ情報を表示させます。

解説
---

History API のために .htaccess を追加しています。

```bash
<ifModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule (.*) index.html [L,QSA]
</ifModule>
```

`Backbone.history.start` を呼び出す際にルート URI を指定する必要があります。app/app.js では次のように指定しています。ソースコード一式を含むフォルダーの名前を変更する場合、修正する必要があります。

```javascript
Backbone.history.start({ pushState: true, root: '/backbone-es6-example' });
```

History API が利用できない、もしくは .htaccess が利用できない場合、`pushState` の値を `false` にすることに加えて、
index.html の文章の中にあるリンクを修正する必要があります。

```html
<ul id='nav'>
  <li><a href="#">ホーム</a></li>
  <li><a href="#about">自己紹介</a></li>
  <li><a href="#error">存在しないページ</a></li>
</ul>
```