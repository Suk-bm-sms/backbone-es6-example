var Page = Backbone.Model.extend({
  defaults: {
    id: null,
    name: null,
    title: null,
    body: null
  }
});

var PageCollection = Backbone.Collection.extend({
  model: Page,
  localStorage: new Backbone.LocalStorage('PageCollection'),
  initData: [
    {id: 1, name: 'index', title: 'ホームの見出し', body: 'ホームの内容'},
    {id: 2, name: 'about', title: '自己紹介の見出し', body: '自己紹介の内容'}
  ],
  populateInitData: function() {
    var that = this;
    if (that.length === 0) {
      that.initData.forEach(function(elm) {
        that.create(elm);
      });
    }
  },
  findByName: function(name) {
    var page = this.findWhere({name: name});

    if (typeof page === 'undefined') {

      return new Backbone.Model({
        id: null,
        name: null,
        title: 'エラー',
        body: 'ページは存在しません'
      });
    } 

    return page;
  }
});


var PageView = Backbone.View.extend({
  el: '#pageView',
  template: _.template($('#pageTemplate').html()),
  initialize: function(options) {
    this.siteTitle = options.siteTitle;
    this.$title = $('title');
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(PubSub, 'normal-mode', this.show);
    this.listenTo(PubSub, 'edit-mode', this.hide);
  },
  render: function(model) {
    var title = model.get('title');

    this.$title.html(title + ' - ' + this.siteTitle);
    this.$el.html(this.template(model.toJSON()));
  }
});

var EditView = Backbone.View.extend({
  el: '#editView',
  template: _.template($('#editTemplate').html()),
  initialize: function(options) {
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(PubSub, 'edit-mode', this.show);
    this.listenTo(PubSub, 'normal-mode', this.hide);
    this.listenTo(PubSub, 'order-save', this.save);
    this.listenTo(PubSub, 'order-reset', this.reset);
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

    while (model = this.collection.first()) {
      model.destroy();
    }

    this.collection.populateInitData();

    var name = this.getName();

    model = this.collection.findByName(name);
    this.collection.trigger('change', model);
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
    PubSub.trigger('edit-mode');
  },
  handleCancel: function() {
    this.normalMode();
    PubSub.trigger('normal-mode');
  },
  handleSave: function() {
    this.normalMode();
    PubSub.trigger('normal-mode');
    PubSub.trigger('order-save');
  },
  handleReset: function() {
    PubSub.trigger('order-reset');
  }
});

var ViewMixin = {
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
};

_.extend(PageView.prototype, ViewMixin);
_.extend(EditView.prototype, ViewMixin);

var app = {};

app.siteTitle = 'Backbone の練習';
app.collection = new PageCollection;
app.pageView = new PageView({
  collection: app.collection,
  siteTitle: app.siteTitle
});
app.editView = new EditView({
  collection: app.collection
});

app.buttonView = new ButtonView({
  collection: app.collection
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

app.router = new Router({
  collection: app.collection
});
Backbone.history.start();