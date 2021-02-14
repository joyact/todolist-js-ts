import ViewFrame from './ViewFrame.js';

export default class extends ViewFrame {
  constructor() {
    super();
    this.setTitle('Home');
  }

  // from the server side
  // grab the data and return it
  async getHtml() {
    return `
      <div>Welcome to wediz!</div>
    `;
  }
}
