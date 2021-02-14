// all of the view classes inherit it here
export default class {
  constructor() {}

  // update the page title
  setTitle(title) {
    document.title = title;
  }

  // override by each views
  async getHtml() {
    return '';
  }
}
