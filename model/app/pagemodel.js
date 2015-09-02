export default class PageModel extends Backbone.Model {
  constructor(options) {
    super(options);
    this.localStorage = new Backbone.LocalStorage('PageModel');
  }

  defaults() {
    return {
      id: 1
    }
  }

  init() {
    this.save({
      id: 1,
      title: 'ホームのタイトル',
      body: 'ホームの内容'
    });
  }
}