export default class ButtonView extends Backbone.View {

  constructor(options) {
    let ext = {
      el: '#buttonView',
      events: {
        'click button': 'handleClick'
      }
    };
    options = options ? _.extend(options, ext) : ext;

    super(options);

    this.dispatcher = options.dispatcher;
    this.listenTo(this.dispatcher, 'button-status', this.handleButtonStatus);
  }

  handleClick(evt) {
    evt.preventDefault();
    this.dispatcher.trigger('order');

    return false;
  }

  handleButtonStatus(status) {
    this.$el.children('button').prop('disabled', status ? false: true);
  }
}