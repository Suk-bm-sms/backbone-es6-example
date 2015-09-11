import PageModel from './pagemodel';

var PageView = Backbone.View.extend({
  el: '#page',

  template: _.template($('#pageTemplate').html()),

  initialize: function(options) {
    this.model = options.model;

    this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }
});

var MyRouter = Backbone.Router.extend({

  routes: {
      '(:name)(/)': 'dispatch'
  },

  initialize: function(options) {
    this.model = options.model;
  },

  dispatch: function(name) {

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
});

var options = {
    model: new PageModel()
};

new PageView(options);
new MyRouter(options);

Backbone.history.start({ pushState: true, root: 'backbone-es6-example/route2' });
$('#message').html('ページがロードされました。').fadeOut(6000);

// http://stackoverflow.com/a/32375108/531320
$(document.body).on('click', 'a[href]', function(evt) {

  var target = evt.currentTarget;
  var href = target.getAttribute('href');

  if (!href.match(/^https?:\/\//)) {
    Backbone.history.navigate(href, true);
    evt.preventDefault();
  }
});