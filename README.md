EcmaScript 6 (ES6) と Backbone.js のコードの例
============================================

EcmaScript 6 (ES6) と Backbone.js のコードの例です。EcmaScript 6 から EcmaScript 5 への変換に Babel と WebPack を使います。

インストール
-----------


```bash
git clone https://github.com/masakielastic/babel-backbone-example.git
cd babel-backbone-example
mkdir node_modules
npm install
```

ビルド
-----

EcmaScript 6 のソースコードが修正されたら、EcmaScript 5 のコードに自動的に変換されるように WebPack に監視させます。


```bash
webpack --watch
```

package.json に追加した次のコマンドでも可能です。


```
npm run watch
```

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

Backbone.js のコードを書くにあたり、[Backbone TodoMVC + ECMAScript 6](https://github.com/tastejs/todomvc-backbone-es6) のコードや [Backbone and ES6 Classes Revisited](http://benmccormick.org/2015/07/06/backbone-and-es6-classes-revisited/) が参考になりました。
