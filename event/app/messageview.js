export default class MessageView extends Backbone.View {

  constructor(options) {
    let ext = {
      el: '#messageView'
    };
    options = options ? _.extend(options, ext) : ext;

    super(options);

    this.dispatcher = options.dispatcher;
    this.listenTo(this.dispatcher, 'input-status', this.handleInputStatus);
    this.listenTo(this.dispatcher, 'message', this.handleSendMessage);
  }

  handleInputStatus(data) {
    this.$el.find('div:eq(0)').html(data.msg);
  }

  handleSendMessage(data) {
    this.$el.find('div:eq(0)').html(data.msg);
    this.$el.find('div:eq(1)').html('送信内容'); 
    this.$el.find('div:eq(2)').html(data.body); 
  }
}