export default class PageModel extends Backbone.Model {

  sync(method, model, options) {
    model.url = function() {
      var name = model.get('name');

      if (name === 'index') {
        return 'route2/json/' + name + '.json';
      }

      return 'json/' + name + '.json';
    };

    return Backbone.sync(method, model, options);
  }

}