var { Model, View } = Backbone;

export default class PageView extends View {

  get el() {
    return '#page';
  }

  get template() {
    return _.template($('#pageTemplate').html());
  }

  initialize(options) {
    this.model = new Model({
        title: 'タイトル',
        body: '本文'
    });

    this.render();
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
}