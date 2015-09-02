export default class MyRouter extends Backbone.Router {

  constructor() {
    super({
      routes: {
        '(:name)(/)': 'dispatch'
      }
    });
    //this.route('(:name)(/)', 'dispatch');
  }

  dispatch(name) {

    if (name === null) {
      name = 'index';
    }

    let $content = $('#page');
    $content.children('h1').html(name + ' のタイトル');
    $content.children('div').html(name + ' の内容');
  }

}