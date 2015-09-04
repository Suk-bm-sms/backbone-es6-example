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
    this.dispatcher = options.dispatcher;
    this.siteTitle = options.siteTitle;

    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.dispatcher, 'normal-mode', this.show);
    this.listenTo(this.dispatcher, 'edit-mode', this.hide);
  }

  render(model) {
    var title = model.get('title');

    this.$title.html(title + ' - ' + this.siteTitle);
    this.$el.html(this.template(model.toJSON()));
  }

  show() {
    this.$el.show();
  }

  hide() {
    this.$el.hide();
  }

  getName() {
    var name = Backbone.history.fragment;

    return name === '' ? 'index' : name;
  }
}