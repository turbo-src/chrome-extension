<<<<<<< HEAD
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
=======
This JSON file is the package file for a chrome extension known as 'turbo-src'. The package version is '0.0.1' and it is essentially a set of add-ons for the GitHub website. Interestingly, it also facilitates the display of each file's size, copying of file content, contains a direct link for downloading files, and exhibits the repo size.

The package has dependencies including libraries for both the front-end and back-end such as '@emotion/react', '@emotion/styled', 'axios', 'express', 'react', 'reactstrap' and many more. It also uses tools to enhance its development process, such as 'eslint' for linting, 'prettier' for code formatting, 'jest' for testing, and 'webpack' for bundling.

This extension offers various scripts for different development contexts like 'devLocal', 'devLocalRouter', 'devOnline', and 'prod'. The 'husky' section includes hooks for coding standards enforcement actions prior to a 'git push'.

Additionally, the package specifies the need for a Node.js engine version of '>= 10.16.0'. The extension was authored by 'turbo-src', and is licensed under the MIT license. Any bugs identified can be reported on the URL provided in the 'bugs' section.
>>>>>>> routeClientModeAndOnline
