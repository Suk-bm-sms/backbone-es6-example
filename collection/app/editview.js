export default EditView extends Backbone.View {

  get el() {
    return '#editView';
  }

  get template()  {
    return _.template($('#editTemplate').html());
  }

  initialize(options) {
    this.dispatcher = options.dispatcher;
    this.collection = options.collection;

    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.dispatcher, 'edit-mode', this.show);
    this.listenTo(this.dispatcher, 'normal-mode', this.hide);
    this.listenTo(this.dispatcher, 'order-save', this.save);
    this.listenTo(this.dispatcher, 'order-reset', this.reset);
    this.hide();
  }

  render(model) {

    if (typeof model === 'undefined') {
      let name = this.getName();
      model = this.collection.findByName(name);
    }

    this.$el.html(this.template(model.toJSON()));
  }

  save() {
    let title = this.$el.find('input[type="text"]').val();
    let body = this.$el.find('textarea').val();
    let name = this.getName();
    let page = this.collection.findByName(name);
    page.save({title: title, body:body});

  }

  reset() {
    let collection = this.collection;
    let model;

    while (model = this.collection.first()) {
      model.destroy();
    }

    this.collection.populateInitData(); 
  }

  show() {
    this.$el.show();
  }

  hide() {
    this.$el.hide();
  }

  getName() {
    let name = Backbone.history.fragment;

    return name === '' ? 'index' : name;
  }
}