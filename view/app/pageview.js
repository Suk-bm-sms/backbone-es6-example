var { Model, View } = Backbone;

export default class PageView extends View {

  constructor(options) {
    let model = new Model({
      title: 'タイトル',
      body: '本文'
    });

    super({
      el: '#page',
      model: model
    });

    this.template = _.template($('#pageTemplate').html());

    this.render();
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
  }
}