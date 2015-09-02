export default class PageView extends Backbone.View {

  get el() {
    return '#pageView';
  }

  get template() {
    return _.template($('#pageTemplate').html());
  }

  constructor(options) {
    super(options);

    this.siteTitle = options.siteTitle;
    this.dispatcher = options.dispatcher;

    this.$title = $('title');

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.dispatcher, 'normal-mode', this.show);
    this.listenTo(this.dispatcher, 'edit-mode', this.hide);
  }

  render() {
    var page = this.model;
    this.$title.html(page.get('title')  + ' - ' + this.siteTitle);
    this.$el.html(this.template(page.toJSON()));
  }
}