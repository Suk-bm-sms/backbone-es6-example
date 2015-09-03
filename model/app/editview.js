export default class EditView extends Backbone.View {
  constructor(options) {
    super({
      el: '#editView'
    });

    this.template = _.template($('#editTemplate').html());

    this.model = options.model;

    this.dispatcher = options.dispatcher;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.dispatcher, 'edit-mode', this.show);
    this.listenTo(this.dispatcher, 'normal-mode', this.hide);
    this.listenTo(this.dispatcher, 'order-save', this.save);
    this.listenTo(this.dispatcher, 'order-reset', this.reset);
    this.hide();
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
  }

  save() {
    let title = this.$el.find('input[type="text"]').val();
    let body = this.$el.find('textarea').val();

    this.model.save({
      title: title,
      body: body
    });
  }

  reset() {
    this.model.init();
  }

  show() {
    this.render();
    this.$el.show();
  }

  hide() {
    this.$el.hide();
  }
}