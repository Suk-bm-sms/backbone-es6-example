export default class PageView extends Backbone.View {

  get el() {
    return '#page';
  }

  get template() {
    return _.template($('#pageTemplate').html());
  }

  constructor(options) {
    super(options);

    this.$title = $('title');
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