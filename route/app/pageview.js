export default class PageView extends Backbone.View {

  get el() {
    return '#page';
  }

  get $title() {
    return $('title');
  }

  get template() {
    return _.template($('#pageTemplate').html());
  }

  initialize(options) {
    this.pageTitle = this.$title.html();
    this.model = options.model;

    this.listenTo(this.model, 'change', this.render);
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$title.html(this.model.get('title') + ' - ' + this.pageTitle);

    return this;
  }
}