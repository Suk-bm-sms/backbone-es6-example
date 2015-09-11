export default class PageView extends Backbone.View
{
  get el() {
    return '#page';
  }

  get template() {
    return _.template($('#pageTemplate').html());
  }

  initialize(options) {
    this.model = options.model;

    this.listenTo(this.model, 'change', this.render);
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }
}