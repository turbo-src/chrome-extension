<<<<<<< HEAD
The file `/app/filebot-store-000/chrome-extension/manifest.json` consists of a configuration for a Chrome extension named "turbo-src". It outlines the properties of this extension such as:

- **Name, Short Name, and Version**: It's named "turbo-src", with the same for its short name, and the current version is "0.0.1".

- **Manifest Version**: It uses version 2 of the manifest file format.

- **Description**: Its purpose is to allow voting on pull requests.

- **Homepage and Author**: The homepage is hosted on GitHub and the author is also "turbo-src".

- **Icons**: It uses three different sizes of icons (16x16, 48x48, and 128x128 pixels) that are stored in the icons directory.

- **Browser Action**: Defines how the extension will behave when clicked, leading to a popup with the default title "turbo-src".

- **Permissions**: It has several permissions, including access to any URLs under github.com, turbosrc-marialis.dev, and turbosrc-auth.fly.dev domains, plus local storage, web requests, web navigation, and the active tab.

- **Content Scripts**: These define what scripts and styles to inject into pages matching certain patterns. It's using the `inject.bundle.js` JavaScript file and `modal.css` CSS file.

- **Content Security Policy (CSP)**: Specifies the policy for loading content, allowing only scripts from the same source and those using unsafe-eval.

- **Background Page**: The extension maintains a background page running the `background.js` script persistently.

- **Options UI**: It specifies an options page that uses Chrome-style UI design.
=======
This is the manifest file for the "turbo-src" Chrome extension, version 0.0.1. It helps with voting on pull requests via a popup that the extension provides by its browser action. You can find their parent project on their homepage at https://github.com/softvar/enhanced-github.

The icons for the extension are provided in PNG format in three different resolutions: 16x16, 48x48, and 128x128 pixels. 

The extension requires several permissions such as access to GitHub, turbosrc-marialis.dev, turbosrc-auth.fly.dev, and localhost:5001, along with the keys to store data, control web requests and navigation, and work with the active tab.

It injects a style sheet (modal.css) and a JavaScript file (inject.bundle.js) into the content of matching pages (GitHub, turbosrc-marialis.dev, turbosrc-auth.fly.dev).

It has its content security policy defined and includes a background script ("background.js") that always remains running.

Finally, it provides a user interface for options, accessible in the Chrome extension options UI, which adheres to Chrome's style guidelines.
>>>>>>> routeClientModeAndOnline
