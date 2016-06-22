'use babel'

export default class BrowserSupreme {
  constructor (uri) {
    this.url = uri;
  }

  getTitle () {
    return 'bogus title from model';
  }
}
