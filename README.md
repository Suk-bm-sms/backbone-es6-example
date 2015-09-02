Backbone.js と EcmaScript 6 (ES6) のコードの例
============================================

 Backbone.js と EcmaScript 6 (ES6) のコードの例です。EcmaScript 6 から EcmaScript 5 への変換に Babel と WebPack を使います。

インストール
-----------


```bash
git clone https://github.com/masakielastic/backbone-es6-example.git
cd backbone-es6-example
mkdir node_modules
npm install
```

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

### 圧縮

変換と同時に UglifyJs によるファイルサイズの圧縮も行われます。UglifyJs を使うための webkpack.config.js の設定は次のとおりです。

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
