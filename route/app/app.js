import NavView from './navview';
import PageView from './pageview';
import MyRouter from './router';

$(() => {
  let options = {
    model: new Backbone.Model()
  };

  new NavView();
  new PageView(options);
  new MyRouter(options);

  Backbone.history.start({ pushState: true, root: '/backbone-es6-example' });
  $('#message').html('ページがロードされました。').fadeOut(6000);
});