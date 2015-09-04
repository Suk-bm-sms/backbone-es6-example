export default class Router extends Backbone.Router
{
  get routes() {
    return {
      '(:name)(/)': 'dispatch'
    };
  }

  initialize(options) {
    this.collection = options.collection;
  }

  dispatch(name) {
    if (name === null) {
      name = 'index';
    }

    let model = this.collection.findByName(name);
    this.collection.trigger('change', model);
  }
}