export default class ButtonView extends Backbone.View {

  get el() {
    return '#buttonView';
  }

  get events() {
    return {
      'click button': 'handleClick'
    };
  }

  initialize(options) {
    this.dispatcher = options.dispatcher;
    this.listenTo(this.dispatcher, 'button-status', this.handleButtonStatus);
  }

  handleClick(evt) {
    evt.preventDefault();
    this.dispatcher.trigger('order');
  }

  handleButtonStatus(data) {
    this.$el.children('button').prop('disabled', data.status ? false: true);
  }
}