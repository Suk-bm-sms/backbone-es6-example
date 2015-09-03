export default class PageModel extends Backbone.Model
{
  get defaults() {
    return {
      id: null,
      name: null,
      title: null,
      body: null
    };
  }
}