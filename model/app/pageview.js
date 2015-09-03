export default class PageView extends Backbone.View {

  get el() {
    return '#pageView';
  }

  get template() {
    return _.template($('#pageTemplate').html());
  }

  get $title() {
    return $('title');
  }

  constructor(options) {
    super(options);

    this.siteTitle = options.siteTitle;
    this.model = options.model;
    this.dispatcher = options.dispatcher;

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.dispatcher, 'normal-mode', this.show);
    this.listenTo(this.dispatcher, 'edit-mode', this.hide);
  }

  render() {
    let page = this.model;
    this.$title.html(page.get('title')  + ' - ' + this.siteTitle);
    this.$el.html(this.template(page.toJSON()));
  }

  show() {
    this.render();
    this.$el.show();
  }

  hide() {
    this.$el.hide();
  }
}