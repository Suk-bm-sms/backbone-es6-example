export default class PageView extends Backbone.View
{
  get el() {
    return '#pageView';
  }

  get $title() {
    return $('title');
  }

  get template() {
    return _.template($('#pageTemplate').html());
  }

  initialize(options) {
    this.siteTitle = options.siteTitle;
    this.dispatcher = options.dispatcher;

    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.dispatcher, 'normal-mode', this.show);
    this.listenTo(this.dispatcher, 'edit-mode', this.hide);
  }

  render(model) {
    let title = model.get('title');

    this.$title.html(title + ' - ' + this.siteTitle);
    this.$el.html(this.template(model.toJSON()));
  }

  show() {
    this.$el.show();
  }

  hide() {
    this.$el.hide();
  }
}