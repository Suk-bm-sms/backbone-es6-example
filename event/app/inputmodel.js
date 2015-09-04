export default class InputModel extends Backbone.Model {

  get defaults() {
    return {
      id: null,
      status: null,
      msg: null,
      body: null
    };
  }

  validate(attrs, options) {
    if (3 > attrs.body.length) {
      return '3文字以上入力してください。';
    }
  }
}