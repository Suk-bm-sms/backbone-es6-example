import PageCollection from './pagecollection';
import PageView from './pageview';

var EditView = Backbone.View.extend({
  el: '#editView',
  template: _.template($('#editTemplate').html()),
  initialize: function(options) {
    this.dispatcher = options.dispatcher;

    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.dispatcher, 'edit-mode', this.show);
    this.listenTo(this.dispatcher, 'normal-mode', this.hide);
    this.listenTo(this.dispatcher, 'order-save', this.save);
    this.listenTo(this.dispatcher, 'order-reset', this.reset);
    this.hide();
  },
  render: function(model) {

    if (typeof model === 'undefined') {
      var name = this.getName();
      var model = this.collection.findByName(name);
    }

    this.$el.html(this.template(model.toJSON()));
  },
  save: function() {
    var title = this.$el.find('input[type="text"]').val();
    var body = this.$el.find('textarea').val();
    var name = this.getName();
    var page = this.collection.findByName(name);
    page.save({title: title, body:body});

  },
  reset: function() {
    var collection = this.collection;
    var model;

    while (model = collection.first()) {
      model.destroy();
    }

    collection.populateInitData();

    var name = this.getName();

    model = collection.findByName(name);
    collection.trigger('change', model);
  },
  show: function() {
    this.$el.show();
  },
  hide: function() {
    this.$el.hide();
  },
  getName: function() {
    var name = Backbone.history.fragment;

    return name === '' ? 'index' : name;
  }
});


var ButtonView = Backbone.View.extend({
  el: '#buttonView',
  template: _.template($('#buttonTemplate').html()),
  events: {
    'click li:nth-child(1)': 'handleEdit',
    'click li:nth-child(2)': 'handleCancel',
    'click li:nth-child(3)': 'handleSave',
    'click li:nth-child(4)': 'handleReset',  
  },
  initialize: function(options) {
    this.model = new Backbone.Model;
    this.collection = options.collection;
    this.dispatcher = options.dispatcher;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.collection, 'change', this.handleCollectionChange);
  },
  render: function() {
    var list = this.model.toJSON()['display'];
    this.$el.html(this.template({list: list}));
  },
  handleCollectionChange(model) {
    if (model.get('id') === null) {
      this.errorMode();
    } else {
      this.normalMode();
    }
  },
  normalMode: function() {
    this.model.set({ display: [
      {label: '編集', display: 'inline'},
      {label: 'キャンセル', display: 'none'},
      {label: '保存', display: 'none'},
      {label: '初期化', display: 'inline'}
    ]});
  },
  editMode: function() {
    this.model.set({ display: [
      {label: '編集', display: 'none'},
      {label: 'キャンセル', display: 'inline'},
      {label: '保存', display: 'inline'},
      {label: '初期化', display: 'none'}
    ]});
  },
  errorMode: function() {
    this.model.set({ display: [
      {label: '編集', display: 'none'},
      {label: 'キャンセル', display: 'none'},
      {label: '保存', display: 'none'},
      {label: '初期化', display: 'none'}
    ]});
  },
  handleEdit: function() {
    this.editMode();
    this.dispatcher.trigger('edit-mode');
  },
  handleCancel: function() {
    this.normalMode();
    this.dispatcher.trigger('normal-mode');
  },
  handleSave: function() {
    this.normalMode();
    this.dispatcher.trigger('normal-mode');
    this.dispatcher.trigger('order-save');
  },
  handleReset: function() {
    this.dispatcher.trigger('order-reset');
  }
});

var Router = Backbone.Router.extend({
  routes: {
    '(:name)(/)': 'dispatch'
  },
  initialize(options) {
    this.collection = options.collection;
  },
  dispatch: function(name) {
    if (name === null) {
      name = 'index';
    }

    var that = this;

    that.collection.fetch({
      silent: true,
      success: function() {

        if (that.collection.length === 0) {
          that.collection.populateInitData();
        }

        var model = that.collection.findByName(name);
        that.collection.trigger('change', model);
      }
    });
  }
});

var app = {};
var dispatcher = _.extend({}, Backbone.Events);
app.siteTitle = 'Backbone の練習';
app.collection = new PageCollection;

app.pageView = new PageView({
  collection: app.collection,
  siteTitle: app.siteTitle,
  dispatcher: dispatcher
});
app.editView = new EditView({
  collection: app.collection,
  dispatcher: dispatcher
});

app.buttonView = new ButtonView({
  collection: app.collection,
  dispatcher: dispatcher
});

app.router = new Router({
  collection: app.collection
});

Backbone.history.start({ pushState: true, root: '/backbone-es6-example/collection' });

// http://stackoverflow.com/a/32375108/531320
$(document).on('click', 'a[href]', function(evt) {

  var target = evt.currentTarget;
  var href = target.getAttribute('href');

  if (!href.match(/^https?:\/\//)) {
    Backbone.history.navigate(href, true);
    evt.preventDefault();
  }
});

$('#message').html('ページがロードされました。').fadeOut(6000);