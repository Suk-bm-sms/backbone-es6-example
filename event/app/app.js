import InputModel from './inputmodel.js';
import ButtonView from './buttonview';
import MessageView from './messageview';
import EditView from './editview.js';

$(() => {
  let dispatcher =  _.extend({}, Backbone.Events);

  new ButtonView({
    dispatcher: dispatcher
  });
  new EditView({
    model: new InputModel(),
    dispatcher: dispatcher
  });
  new MessageView({
    dispatcher: dispatcher
  });
});