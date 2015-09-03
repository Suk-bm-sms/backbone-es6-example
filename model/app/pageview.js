export default class PageView extends Backbone.View {

  constructor(options) {
    super({
      el: '#pageView'
    });

    this.model = options.model;
    this.siteTitle = options.siteTitle;
    this.dispatcher = options.dispatcher;

    this.template = _.template($('#pageTemplate').html());
    this.$title = $('title');

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