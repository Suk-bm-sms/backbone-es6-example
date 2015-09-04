export default class ButtonView extends Backbone.View
{
  get el() {
    return '#buttonView';
  }

  get template() {
    return _.template($('#buttonTemplate').html());
  }

  get events() {
    return {
      'click li:nth-child(1)': 'handleEdit',
      'click li:nth-child(2)': 'handleCancel',
      'click li:nth-child(3)': 'handleSave',
      'click li:nth-child(4)': 'handleReset'
    };
  }

  initialize(options) {
    this.dispatcher = options.dispatcher;
    this.collection = options.collecion;
    this.model = new Backbone.Model;

    this.listenTo(this.model, 'change', this.render);
    this.normalMode();
  }

  render(options) {
    let list = this.model.toJSON()['display'];
    this.$el.html(this.footerTemplate({list: list}));
  }

  normalMode() {
    this.model.set({ display: [
      {label: '編集', display: 'inline'},
      {label: 'キャンセル', display: 'none'},
      {label: '保存', display: 'none'},
      {label: '初期化', display: 'inline'}
    ]});
  }

  editMode() {
    this.model.set({ display: [
      {label: '編集', display: 'none'},
      {label: 'キャンセル', display: 'inline'},
      {label: '保存', display: 'inline'},
      {label: '初期化', display: 'none'}
    ]});
  }

  errorMode() {
    this.model.set({ display: [
      {label: '編集', display: 'none'},
      {label: 'キャンセル', display: 'none'},
      {label: '保存', display: 'none'},
      {label: '初期化', display: 'none'}
    ]});
  }

  handleEdit() {
    this.editMode();
    this.dispatcher.trigger('edit-mode');
  }

  handleCancel() {
    this.normalMode();
    this.dispatcher.trigger('normal-mode');
  }

  handleSave() {
    this.normalMode();
    this.dispatcher.trigger('normal-mode');
    this.dispatcher.trigger('order-save');
  }

  handleReset() {
    this.dispatcher.trigger('order-reset');
  }
}