export default class PageModel extends Backbone.Model {

  get defaults() {
    return {
      id: 1
    }
  }

  get localStorage() {
    return new Backbone.LocalStorage('PageModel');
  }

  init() {
    this.save({
      id: 1,
      title: 'ホームのタイトル',
      body: 'ホームの内容'
    });
  }
}