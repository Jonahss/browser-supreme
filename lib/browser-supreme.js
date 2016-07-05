'use babel';

// Atom Package entrypoint, this file handles the lifecycle of the
// browser-supreme plugin

import { CompositeDisposable } from 'atom';
import { isWebUri } from 'valid-url';
import BrowserSupreme from './browser-supreme-model';
import BrowserView from './browser-view.js';

// atom opener for atom.workspace.addOpener
let opener = (uri) => {
  if (!isWebUri(uri)) {
    return;
  }

  console.log(`atom is opening: ${uri}`);
  return new BrowserSupreme(uri);
};

// creates a BrowserView from a BrowserSupreme model
let createView = (browserSupreme) => {
  let view = new BrowserView(browserSupreme.url);
  return view.element;
}

atom.views.addViewProvider(BrowserSupreme, createView)

export default {

  subscriptions: null,

  activate(state) {
    atom.workspace.addOpener(opener);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'browser-supreme:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {

  },

  open(uri) {
    if (!isWebUri(uri)) {
      throw new Error(`${uri} is not a valid url`);
    }
    atom.workspace.open(uri, { split: 'right' });
  },

  toggle() {
    console.log('BrowserSupreme was toggled!');
    this.open('http://saucelabs.com');
  }

};
