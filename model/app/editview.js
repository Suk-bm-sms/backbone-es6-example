export default class EditView extends Backbone.View {
  constructor(options) {
    super({
      el: '#editView'
    });

    this.template = _.template($('#editTemplate').html());

    this.model = new Backbone.Model({
      page: options.model,
      userInput: new Backbone.Model({ title: '', body: '' })
    });

    this.dispatcher = options.dispatcher;
    this.listenTo(this.model.get('page'), 'change', this.render);
    this.listenTo(this.dispatcher, 'edit-mode', this.show);
    this.listenTo(this.dispatcher, 'normal-mode', this.hide);
    this.listenTo(this.dispatcher, 'order-save', this.save);
    this.listenTo(this.dispatcher, 'order-reset', this.reset);
    this.hide();
  }

  render() {
    this.$el.html(this.template(this.model.get('page').toJSON()));
  }

  save() {
    let title = this.$el.find('input[type="text"]').val();
    let body = this.$el.find('textarea').val();

    this.model.get('page').save({
      title: title,
      body: body
    });
  }

  reset() {
    this.model.get('page').init(); 
  }

  show() {
    this.render();
    this.$el.show();
  }

  hide() {
    this.$el.hide();
  }
}