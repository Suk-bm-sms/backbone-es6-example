import PageModel from './pagemodel';
import PageView from './pageview';
import EditView from './editview';
import ButtonView from './buttonview';

$(() => {
  let siteTitle = 'Backbone の練習';

  let dispatcher = _.extend({}, Backbone.Events);
  let model = new PageModel();

  new PageView({
    siteTitle: siteTitle,
    model: model,
    dispatcher: dispatcher
  });
  new EditView({
    model: model,
    dispatcher: dispatcher
  });
  new ButtonView({
    dispatcher: dispatcher
  });

  model.fetch({
    silent: true,
    success: function() {
      model.trigger('change');
    },
    error: function() {
      if (typeof model.get('title') === 'undefined') {
        model.init();
      }
    }
  });

});