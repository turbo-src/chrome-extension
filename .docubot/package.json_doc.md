This is a JSON configuration file for a Google Chrome extension project named "turbo-src". The extension adds useful functionalities to GitHub, such as displaying the repository size, downloading file, displaying the file size, and copying file contents.

Features:
- The main file of the application is "src/inject.js".
- It suggests the use of Node.js version 10.16.0 or later.
- Scripts for running the server, developing the extension, testing and linting the code are detailed under the scripts section.
- The project is stored in the following GitHub location: "git+https://github.com/turbo-src/extension.git".
- It has a MIT license with the author credited as "turbo-src".

Dependencies:
The package has several dependencies including:
- "@babel/core", "webpack", and "jest" for compiling the code and running tests.
- "dotenv", "express", and "jsonwebtoken" for handling server-related tasks.
- "react" and "styled-components" for the user interface.
- "axios", "node-fetch", and "graphql" for API interactions.

Dev Dependencies:
There are also development dependencies including Babel and ESLint configurations, Husky for pre-commit checks, and Prettier for code formatting. 

Other data:
- "husky" and "lint-staged" sections are used for performing checks and formatting code before committing to Git.
- The "engines" field ensures that the package will run on compatible engine versions.
- The "keywords" section could assist in finding the extension when searched with similar terms.