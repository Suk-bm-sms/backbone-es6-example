export default class NavView extends Backbone.View {

  constructor() {
    super({
      el: '#nav',
      events: {
        'click a': 'handleClick'
      }
    });
  }

  handleClick(evt) {
    let href = $(evt.currentTarget).attr('href');

    Backbone.history.navigate(href, true);

    return false;
  }
}