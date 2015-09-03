import PageCollection from './pagecollection';
import PageView from './pageview';
import EditView from './editview';
import ButtonView from './buttonview';
import Router from './router';

$(() => {
  let dispatcher = _.extend({}, Backbone.Events);
  let siteTitle = 'Backbone の練習';
  let collection = new PageCollection;

  new PageView({
    siteTitle: siteTitle,
    collection: collection,
    dispatcher: dispatcher
  });
  new EditView({
    collection: collection,
    dispatcher: dispatcher
  });

  new ButtonView({
    collection: collection,
    dispatcher: dispatcher
  });

  new Router({
    collection: collection
  });

  Backbone.history.start({ pushState: true, root: '/backbone-es6-example/collection' });

  // http://stackoverflow.com/a/32375108/531320
  $(document).on('click', 'a[href]', function(evt) {

    var target = evt.currentTarget;
    var href = target.getAttribute('href');

    if (!href.match(/^https?:\/\//)) {
      Backbone.history.navigate(href, true);
      evt.preventDefault();
    }
  });

  $('#message').html('ページがロードされました。').fadeOut(6000);
});