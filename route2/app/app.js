import PageModel from './pagemodel';
import PageView from './pageview';
import MyRouter from './myrouter';

var options = {
    model: new PageModel()
};

new PageView(options);
new MyRouter(options);

Backbone.history.start({ pushState: true, root: 'backbone-es6-example/route2' });

// http://stackoverflow.com/a/32375108/531320
$(document.body).on('click', 'a[href]', function(evt) {

  var target = evt.currentTarget;
  var href = target.getAttribute('href');

  if (!href.match(/^https?:\/\//)) {
    Backbone.history.navigate(href, true);
    evt.preventDefault();
  }
});

$('#message').html('ページがロードされました。').fadeOut(6000);