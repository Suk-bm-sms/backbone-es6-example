export default class PageModel extends Backbone.Model {

  sync(method, model, options) {
    model.url = function() {
      let name = model.get('name');
      let prefix = name === 'index' ? 'route2/' : '';

      return prefix + 'json/' + name + '.json';
    };

    return Backbone.sync(method, model, options);
  }

}