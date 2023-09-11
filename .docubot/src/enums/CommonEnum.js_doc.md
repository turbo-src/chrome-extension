File: `/app/filebot-store-000/chrome-extension/src/enums/CommonEnum.js`

This file serves as a module within the Chrome extension part of the application, exporting an enumeration (enums). Enums in JavaScript represent a type of value that can be one of a few predefined constants.

This particular CommonEnum.js file exports a single constant `TOKEN` that represents the string 'token'. This can be useful in scenarios where `TOKEN` is used throughout the code, to maintain consistency and prevent errors due to typos in string value.

Usage:
This enum can be imported into other JavaScript modules in the application and used like this:
```javascript
const commonEnum = require('./enums/CommonEnum.js');
console.log(commonEnum.TOKEN);  // Outputs: 'token'
```
This `TOKEN` may be used for accessing, storing, or manipulating token-related data across the application, particularly within the Chrome extension module.
