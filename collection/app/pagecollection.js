export default class PageCollection extends Backbone.Collection
{
  get localStorage() {
    return new Backbone.LocalStorage('PageCollection')
  }

  get initData() {
    return [
      {id: 1, name: 'index', title: 'ホームの見出し', body: 'ホームの内容'},
      {id: 2, name: 'about', title: '自己紹介の見出し', body: '自己紹介の内容'}
    ]
  }

  populateInitData() {
    let that = this;
    if (that.length === 0) {
      that.initData.forEach(function(elm) {
        that.create(elm);
      });
    }
  }

  findByName(name) {
    let page = this.findWhere({name: name});

    if (typeof page === 'undefined') {

      return new Backbone.Model({
        id: null,
        name: null,
        title: 'エラー',
        body: 'ページは存在しません'
      });
    } 

    return page;
  }
}