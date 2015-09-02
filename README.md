Backbone.js と EcmaScript 6 (ES6) のコードの例
============================================

 Backbone.js と EcmaScript 6 (ES6) のコードの例です。EcmaScript 6 から EcmaScript 5 への変換に Babel と WebPack を使います。

システムの要件
------------

次の要件を前提とします。

 * npm
 * History API が利用できるブラウザー

npm は nvm から node.js もしくは io.js をインストールすれば利用できるようになります。History API は Backbone Router を使うために必要です。

Google Chrome と Apache HTTP Server で動作の確認をしており、Backbone Router のために .htaccess を追加しています。

Backbone.history.start を呼び出す際にルート URI を指定する必要があります。app/app.js では次のように指定しています。ソースコード一式を含むフォルダーの名前を変更する場合、修正する必要があります。

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

インストール
----------

ターミナルから次のコマンドを実行します。

```bash
git clone https://github.com/masakielastic/backbone-es6-example.git
cd backbone-es6-example
mkdir node_modules
npm install
```

npm を実行したディレクトリに node_modules のフォルダーが存在しない場合、別のディレクトリにある node_modules にインストールされてしまう可能性があります。

ビルド
-----

EcmaScript 6 のソースコードが修正されたら、EcmaScript 5 のコードに自動的に変換されるように WebPack に監視させます。

```bash
webpack --watch
```

package.json に追加した次のコマンドを実行します。


```
npm run watch
```

Webpack と Babel の連携のために [babel-loader](https://github.com/babel/babel-loader) が導入されており、webpack.config.js のコードの例は次のようになります。

```javascript
{
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
}
```

### 圧縮

変換されたコードのファイルは UglifyJs によって圧縮されます。UglifyJs を使うための webkpack.config.js の設定は次のとおりです。変換されたコードを確認したい場合、コメントアウトして無効にするとよいでしょう。

```javascript
{
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
}
```

参考資料
-------

jQuery などの外部ライブラリの管理について、WebPack の公式マニュアルの [LIBRARY AND EXTERNALS](http://webpack.github.io/docs/library-and-externals.html) や stackoverflow の [Managing Jquery plugin dependency in webpack](http://stackoverflow.com/q/28969861/531320) への回答が参考になりました。

Backbone.js のコードを書くにあたり、[Backbone TodoMVC + ECMAScript 6](https://github.com/tastejs/todomvc-backbone-es6) のコードや [Backbone and ES6 Classes Revisited](http://benmccormick.org/2015/07/06/backbone-and-es6-classes-revisited/) が参考になりました。
