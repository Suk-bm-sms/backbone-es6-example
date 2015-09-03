モデル - Backbone.js と ES6
==========================

1つの画面で表示と編集の両方ができます。編集した内容は localStorage に永続的に保存されます。リセットボタンをクリックすれば、初期のデータに戻すことができます。


解説
----

モデルと localStorage を連携させるために Backbone localStorage Adapter を導入します。モデルの `id` 属性のデフォルト値を指定しないとエラーになり、`url` の設定を求めるエラーメッセージが表示されます。
 
ページが読み込まれた際に、`fetch` を実行して localStorage から値を取り出します。localStorage にデータが保存されていない場合のために、`silent` に `true` を指定して、`change` イベントを自動的に発行しないようにします。

ビューは3つ用意しました。それぞれの責務は、ページ情報の表示 (PageView)、編集画面 (EditView)、ボタンによる画面の切り替え (ButtonView) です。


それぞれのビューは Dispatcher を通じて連携します。ButtonView が複数のイベントを発行するのに対して、PageView、EditView は受動的にイベントに対応します。