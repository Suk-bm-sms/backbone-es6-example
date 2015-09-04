export default class Router extends Backbone.Router.extend
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

    let that = this;

    that.collection.fetch({
      silent: true,
      success: function() {

        if (that.collection.length === 0) {
          that.collection.populateInitData();
        } else {
          let model = that.collection.findByName(name);
          that.collection.trigger('change', model);
        }
      }
    });
  }
}