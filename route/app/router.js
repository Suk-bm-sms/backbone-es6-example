export default class MyRouter extends Backbone.Router {

  constructor(options) {
    options = _.extend(options, 
    {
      routes: {
        '(:name)(/)': 'dispatch'
      }
    }
    );

    super(options);
    this.model = options.model;
  }

  dispatch(name) {
    if (name === null) {
      name = 'index';
    }

    this.model.set({
      title: name + ' のタイトル',
      body: name + ' の内容'
    });
  }

}