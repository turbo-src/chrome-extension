### Permissions required

- `"*://*.github.com/*"` - for running on `github.com` domain.
- `storage` - for storing GitHub access token on your local system. GitHub Access token is required for private repos and for handling API rate-limiting issues.
- `webRequest` - to support GitHub being a single-page-application now. Read this [detailed blog](https://medium.com/@softvar/making-chrome-extension-smart-by-supporting-spa-websites-1f76593637e8).
- `webNavigation` - to support GitHub being a single-page-application now. Read this [detailed blog](https://medium.com/@softvar/making-chrome-extension-smart-by-supporting-spa-websites-1f76593637e8).

## GitHub API Rate Limiting

Since this extension fetches data using GitHub public v3 API for showing file _size_ and _download_url_, it consumes free quota which is very less [GitHub API Rate Limiting](https://developer.github.com/v3/rate_limit/).

To tackle this, create a new GitHub Access Token.

1. If logged-in, visit [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Generate a new token, select `repo` scope and create a one.
3. Copy and store the generated token which looks something like: `17c1a8d5b399d66b6212382d98d4c67a94d58955` (a fake one :P).
4. Click on extension icon and then on `Settings-Options` on top right.
   <img src="screenshots/extension-popup-screenshot.png" width="380" />

   OR

   Right-click on enhanced-github extension and click on `Options` in the dropdown menu.

   <img src="screenshots/extension-options-page.png" width="380" />

5. Enter the valid GitHub Access Token
6. Click on `SAVE` and Enjoy the benefits.

This browser extension will automatically pick this valid access token and Bingo!

## Screenshots

### New GitHub Design - [Blog](https://github.blog/changelog/2020-06-23-design-updates-to-repositories-and-github-ui/)


## Libraries Used

- Thanks to [@zenorocha](https://github.com/zenorocha/) for [Clipboard.js](https://github.com/zenorocha/clipboard.js) - Modern copy to clipboard. No Flash. Just 3kb gzipped.


## Development

1. Clone this repo
2. Run `yarn dev` for generating packaged folder specifically for extension stuff.
3. Go to extension page. For chrome extensions [chrome://extensions](chrome://extensions), Firefox Add-ons [about:debugging](about:debugging), and Microsoft Edge Extensions [edge://extensions/](edge://extensions/).
4. Enable developer mode
5. Click on load unpacked extension and select the generated folder.
6. [Admin Access Only] - run `yarn build` for generating zip file to be uploaded on _Chrome Web Store_, _Firefox Add-ons_, and _Microsoft Edge Addons_.

> The [MIT license](https://opensource.org/licenses/MIT) (MIT)
>
> Copyright (c) 2021 turbo-src
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.