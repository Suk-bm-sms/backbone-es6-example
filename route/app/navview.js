export default class NavView extends Backbone.View {

  get el() {
    return '#nav';
  }

  get events() {
    return {
      'click a': 'handleClick'
    };
  }

  constructor(options) {
    super(options);
  }

  handleClick(evt) {
    let href = $(evt.currentTarget).attr('href');

    Backbone.history.navigate(href, true);

    return false;
  }
}