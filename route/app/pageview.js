export default class PageView extends Backbone.View {

  constructor(options) {
    super({
      el: '#page'
    });
    this.$title = $('title');
    this.pageTitle = this.$title.html();

    this.template = _.template($('#pageTemplate').html());
    this.model = options.model;

    this.listenTo(this.model, 'change', this.render);
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$title.html(this.model.get('title') + ' - ' + this.pageTitle);
    return this;
  }
}