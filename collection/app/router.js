export default class Router extends Backbone.Router.extend
{
  get routes() {
    return {
      '(:name)(/)': 'dispatch'
    }
  }

  initialize(options) {
    this.collection = options.collection;
  }

  dispatch(name) {
    if (name === null) {
      name = 'index';
    }

    let that = this;

    that.collection.fetch({
      silent: true,
      success: function() {}
    });
  }
}