export default class MyRouter extends Backbone.Router {

  get routes() {
    return {
      '(:name)(/)': 'dispatch'
    };
  }

  initialize(options) {
    this.model = options.model;
  }

  dispatch(name) {
    if (name === null) {
      name = 'index';
    }

    this.model.set({
      title: name + ' のタイトル',
      body: name + ' の内容'
    });
  }

}