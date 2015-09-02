var PubSub = _.extend({}, Backbone.Events);

var ButtonView = Backbone.View.extend({
  el: '#buttonView',
  events: {
    'click button': 'handleClick'
  },
  initialize: function() {
    this.listenTo(PubSub, 'button-status', this.handleButtonStatus);
  },
  handleClick: function(evt) {
    evt.preventDefault();
    PubSub.trigger('order');

    return false;
  },
  handleButtonStatus: function(status) {
    this.$el.children('button').prop('disabled', status ? false: true);
  }
});

var EditView = Backbone.View.extend({
  el: '#editView',
  events: {
    'input input[type="text"]': 'handleInput'
  },
  initialize: function() {
    var InputModel = Backbone.Model.extend({
      defaults: {
        id: 1,
        status: null,
        msg: null,
        body: null
      },
      validate: function(attrs, options) {
        if (3 > attrs.body.length) {
          return '3文字以上入力してください。';
        }
      }
    });

    this.model = new InputModel;
    this.$input = this.$el.find('input');

    this.listenTo(PubSub, 'order', this.handleOrder);
    this.listenTo(this.model, 'change:body', this.updateModel);
  },
  updateModel: function() {
    var model = this.model;

    var status = model.isValid();
    var data = {
      status: status,
      msg: status ? '送信可能です。' : model.validationError
    };

    model.set(data);
    PubSub.trigger('button-status', data);
    PubSub.trigger('input-status', data);
  },
  handleInput: function(evt) {
    var model = this.model;
    var body = $(evt.target).val();
    this.model.set({body: body});

    var data = model.toJSON();
  },
  handleOrder: function() {
    var data = this.model.toJSON();
    data.msg = data.status ? '送信は成功しました。': '送信は失敗しました。';

    PubSub.trigger('message', data);

    if (data.status) {
      this.$input.val('');
      this.$input.prop('disabled', true);
      PubSub.trigger('button-status', false);
    }
  }
});

var MessageView = Backbone.View.extend({
  el: '#messageView',
  initialize: function() {
    this.listenTo(PubSub, 'input-status', this.handleInputStatus);
    this.listenTo(PubSub, 'message', this.handleSendMessage);
  },
  handleInputStatus: function(data) {
    this.$el.find('div:eq(0)').html(data.msg);
  },
  handleSendMessage: function(data) {
    this.$el.find('div:eq(0)').html(data.msg);
    this.$el.find('div:eq(1)').html('送信内容'); 
    this.$el.find('div:eq(2)').html(data.body); 
  }
});

var app = {};
app.views = [
  new ButtonView,
  new EditView,
  new MessageView
];