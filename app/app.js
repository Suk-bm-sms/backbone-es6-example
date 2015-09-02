import NavView from './view';
import MyRouter from './router';

new NavView();
new MyRouter();
Backbone.history.start({ pushState: true, root: '/babel-backbone-example' });
$('#message').html('ページがロードされました。').fadeOut(6000);