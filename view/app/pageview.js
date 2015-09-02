var { Model, View } = Backbone;

export default class PageView extends View {

  constructor(options) {
    let ext = {
      el: '#page',
      model: new Model({
        title: 'タイトル',
        body: '本文'
      })
    };

    options = options ? _.extend(options, ext) : ext;

    super(options);

    this.template = _.template($('#pageTemplate').html());
    this.render();
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
}