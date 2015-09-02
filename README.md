Backbone.js と EcmaScript 6 (ES6) のコードの例
============================================

 Backbone.js と EcmaScript 6 (ES6) のコードの例です。EcmaScript 6 から EcmaScript 5 への変換に Babel と WebPack を使います。

システムの要件
------------

このコードを試すには、次の要件を満たすことが必要です。

 * npm がターミナルから利用できること
 * History API が利用できるブラウザー

著者は Google Chrome と Apache HTTP Server で動作の確認をしています。

npm は nvm から node.js もしくは io.js をインストールすれば利用できるようになります。

History API が必要なのは Backbone Router を使うためです。Router のおかげでハッシュタグ (`#about`) を含む `/index.html#about` を `/about` としてブラウザーの URL バーに表示できるようになります。

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

それぞれの例ごとのディレクトリに移動します。EcmaScript 6 のソースコードが修正されたら、EcmaScript 5 のコードに自動的に変換されるように WebPack に監視させます。

```bash
cd some_example
webpack --watch
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