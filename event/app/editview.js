export default class EditView extends Backbone.View {

  get el() {
    return '#editView';
  }

  get events() {
    return {
      'input input[type="text"]': 'handleInput'
    };
  }

  initialize(options) {
    this.dispatcher = options.dispatcher;
    this.$input = this.$el.find('input');

    this.listenTo(this.dispatcher, 'order', this.handleOrder);
    this.listenTo(this.model, 'change:body', this.updateModel);
  }

  updateModel() {
    let model = this.model;
    let status = model.isValid();
    let data = {
      status: status,
      msg: status ? '送信可能です。' : model.validationError
    };

    model.set(data);
    this.dispatcher.trigger('button-status', data);
    this.dispatcher.trigger('input-status', data);
  }

  handleInput(evt) {
    let body = $(evt.target).val();

    this.model.set({body: body});
  }

  handleOrder() {
    let data = this.model.toJSON();
    data.msg = data.status ? '送信は成功しました。': '送信は失敗しました。';

    this.dispatcher.trigger('message', data);

    if (data.status) {
      this.$input.val('');
      this.$input.prop('disabled', true);
      this.dispatcher.trigger('button-status', false);
    }
  }
}