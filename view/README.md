Backbone.View と EcmaScript 6 の例
=================================

Backbone.View を使ってテンプレートをもとにページのタイトルと本文を表示させるプログラムです。

ビルド
-----

package.json のある上のディレクトリでツールをインストールした上で、Webpack のコマンドを実行します。

```bash
cd view
webpack --watch
```

ビルドをカスタマイズするには webpack.config.js を修正します。


解説
----

ビューはモデルの保有しているデータをもとに HTML を生成します。テンプレートエンジンには undescore.js の `_.template` を使います。モデルはデータベースからのデータだけでなく、ビューの状態をあらわすオボジェクトの管理に使うこともできます。

ビューをつくるには Backbone.View を継承するクラスをつくります。EcmaScript 6 では `class` 構文を使うことができます。
初期化の処理は `constructor` および `initialize` の両方で可能です。

```javascript
class PageView extends Backbone.View {
  constructor(options) {
    super(options);
    console.log('constructor: ', options);    
  }

  initialize(options) {
    console.log('initialize: ', options);
  }
}
```

`constructor` の中で `this` を呼び出す場合、あらかじめ `super` を先に呼び出しておかないとエラーになります。

```javascript
constructor(options) {
  super(options);
  this.test = 'test';   
}
```

コンストラクターの引数に複数のプロパティをまとめて追加する場合、underscore.js の `extend` を使うことができます。

```javascript
constructor(options) {
  let ext = {
    el: '#page',
    model: new Model({
      title: 'タイトル',
      body: '本文'
    })
  };

  options = options ? _.extend(options, ext) : ext;

  super(options);
}
```

EcmaScript 6 で導入された `Object.assign` を使うこともできますが、2015年9月の時点でサポートされるブラウザーがかぎられているので、見送りました。


```javascript
if (!options) {
  options = ext;
} else {
  Object.assign(options, ext);
}
```

`template` を `super` の引数に指定しても割り当てされないので、`this.template` に直接割り当てることにしました。


```javascript
this.template = _.template($('#pageTemplate').html());
```