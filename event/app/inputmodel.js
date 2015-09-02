export default class InputModel extends Backbone.Model {
  constructor(options) {

    let ext = {
      defaults: {
        id: null,
        status: null,
        msg: null,
        body: null
      }
    };

    super(ext);
  }

  validate(attrs, options) {
    if (3 > attrs.body.length) {
      return '3文字以上入力してください。';
    }
  }
}