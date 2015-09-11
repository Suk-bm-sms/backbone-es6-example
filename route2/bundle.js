var PageModel = Backbone.Model.extend({
  sync: function(method, model, options) {
    model.url = function() { return 'json/' + model.get('name') + '.json'; };

    return Backbone.sync(method, model, options);
  }
});

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
      success: function(model, response) {
        //model.set(response);
      },
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

Backbone.history.start({ pushState: true, root: '/backbone-example/' });
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