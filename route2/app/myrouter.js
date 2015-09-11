export default class MyRouter extends Backbone.Router
{

  get routes() {
    return {
      '(:name)(/)': 'dispatch'
    }
  }

  initialize(options) {
    this.model = options.model;
  }

  dispatch(name) {

    if (name === null) {
      name = 'index';
    }

    this.model.set({name: name}, { silent: true });
    this.model.fetch({
      error: function(model) {
        model.set({
          name: name,
          title: 'エラー',
          body: 'ページが存在しません。'
        });
      }
    });

  }

}