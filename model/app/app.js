var PageModel = Backbone.Model.extend({
  localStorage: new Backbone.LocalStorage('PageModel'),
  defaults: {
    id: 1
  },
  init: function() {
    this.save({
      id: 1,
      title: 'ホームのタイトル',
      body: 'ホームの内容'
    });
  }
});

var PageView = Backbone.View.extend({
  el: '#pageView',
  template: _.template($('#pageTemplate').html()),
  initialize: function(options) {
    this.siteTitle = options.siteTitle;
    this.$title = $('title');
    this.dispatcher = options.dispatcher;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.dispatcher, 'normal-mode', this.show);
    this.listenTo(this.dispatcher, 'edit-mode', this.hide);
  },
  render: function() {
    var page = this.model;
    this.$title.html(page.get('title')  + ' - ' + this.siteTitle);
    this.$el.html(this.template(page.toJSON()));
  }
});

var EditView = Backbone.View.extend({
  el: '#editView',
  template: _.template($('#editTemplate').html()),
  initialize: function(options) {
    this.model = new Backbone.Model({
      page: this.model,
      userInput: new Backbone.Model({ title: '', body: '' })
    });
    this.dispatcher = options.dispatcher;
    this.listenTo(this.model.get('page'), 'change', this.render);
    this.listenTo(this.dispatcher, 'edit-mode', this.show);
    this.listenTo(this.dispatcher, 'normal-mode', this.hide);
    this.listenTo(this.dispatcher, 'order-save', this.save);
    this.listenTo(this.dispatcher, 'order-reset', this.reset);
    this.hide();
  },
  render: function() {
    this.$el.html(this.template(this.model.get('page').toJSON()));
  },
  save: function() {
    var title = this.$el.find('input[type="text"]').val();
    var body = this.$el.find('textarea').val();
    this.model.get('page').save({
      title: title,
      body: body
    });
  },
  reset: function() {
    this.model.get('page').init(); 
  }
});

var ViewMixin = {
  show: function() {
    this.render();
    this.$el.show();
  },
  hide: function() {
    this.$el.hide();
  }
};

_.extend(PageView.prototype, ViewMixin);
_.extend(EditView.prototype, ViewMixin);

var ButtonView = Backbone.View.extend({
  el: '#buttonView',
  footerTemplate: _.template($('#buttonTemplate').html()),
  events: {
    'click li:nth-child(1)': 'handleEdit',
    'click li:nth-child(2)': 'handleCancel',
    'click li:nth-child(3)': 'handleSave',
    'click li:nth-child(4)': 'handleReset',  
  },
  initialize: function(options) {
    this.model = new Backbone.Model;
    this.dispatcher = options.dispatcher;
    this.listenTo(this.model, 'change', this.render);
    this.normalMode();
  },
  render: function() {
    var list = this.model.toJSON()['display'];
    this.$el.html(this.footerTemplate({list: list}));
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

var dispatcher = _.extend({}, Backbone.Events);
var app = {};
app.siteTitle = 'Backbone の練習';
app.page = new PageModel();

app.pageView = new PageView({
  siteTitle: app.siteTitle,
  model: app.page,
  dispatcher: dispatcher
});
app.editView = new EditView({
  model: app.page,
  dispatcher: dispatcher
});
app.buttonView = new ButtonView({
  dispatcher: dispatcher
});

app.page.fetch({
  silent: true,
  success: function() {
    app.page.trigger('change');
  },
  error: function() {
    if (typeof app.page.get('title') === 'undefined') {
      app.page.init();
    }
  }
});