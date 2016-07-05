'use babel';

export default class BrowserView {
  constructor(url) {
    this.url = url;

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('browser-supreme');

    // Create webview
    const webview = document.createElement('webview');
    this.webview = webview;
    webview.setAttribute('src', this.url);
    // webview.setAttribute('nodeintegration', ''); // breaks some sites like facebook. solution: https://github.com/electron/electron/issues/1133
    webview.setAttribute('allowpopups', '');
    webview.classList.add('native-key-bindings'); // this allows native chrome keybindings to go through to the webview, otherwise atom overrides some (like backspace)

    // Create toolbar
    const toolbar = document.createElement('div');
    toolbar.setAttribute('id', 'toolbar');
    const urlbar = document.createElement('atom-text-editor');
    urlbar.setAttribute('id', 'urlbar');
    urlbar.setAttribute('mini', '');
    let miniEditorModel = urlbar.getModel();
    miniEditorModel.setText(url);
    const go = document.createElement('button');
    go.classList.add('btn');
    go.innerHTML = 'Go!';
    go.onclick = () => {
      console.log('clicked go');
      this.url = miniEditorModel.getText();
      webview.loadURL(this.url);
    };
    const developerTools = document.createElement('button');
    developerTools.classList.add('btn');
    developerTools.innerHTML = 'DeveloperTools';
    developerTools.onclick = () => {
      this.webview.openDevTools();
    };

    toolbar.appendChild(urlbar);
    toolbar.appendChild(go);
    toolbar.appendChild(developerTools);
    this.element.appendChild(toolbar);

    this.element.appendChild(webview);

  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
