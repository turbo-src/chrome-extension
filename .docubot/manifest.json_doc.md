This is the manifest file for the "turbo-src" Chrome extension, version 0.0.1. It helps with voting on pull requests via a popup that the extension provides by its browser action. You can find their parent project on their homepage at https://github.com/softvar/enhanced-github.

The icons for the extension are provided in PNG format in three different resolutions: 16x16, 48x48, and 128x128 pixels. 

The extension requires several permissions such as access to GitHub, turbosrc-marialis.dev, turbosrc-auth.fly.dev, and localhost:5001, along with the keys to store data, control web requests and navigation, and work with the active tab.

It injects a style sheet (modal.css) and a JavaScript file (inject.bundle.js) into the content of matching pages (GitHub, turbosrc-marialis.dev, turbosrc-auth.fly.dev).

It has its content security policy defined and includes a background script ("background.js") that always remains running.

Finally, it provides a user interface for options, accessible in the Chrome extension options UI, which adheres to Chrome's style guidelines.