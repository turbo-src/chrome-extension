The `webpack.config.js` file is a configuration file for Webpack, a static module bundler for modern JavaScript applications. Here is the documentation for this specific config file:

- **Webpack Dependencies:** This includes `webpack`, `copy-webpack-plugin`, `clean-webpack-plugin`, `webpack-zip-files-plugin`, `dotenv-webpack` and `path`.

- **Source Files:** The source files specified are `./src/popup.js` and `./src/inject.js`.

- **Output Files:** The output files are '[name].bundle.js' and are bundled in the "dist" folder which resides in the main directory. The library name is 'extension'.

- **Modules and Loaders:** The Loader configurations mentioned are for:
  1. image files - handled by `file-loader`.
  2. JavaScript files - handled by `babel-loader` with presets for `react-app` and plugins `@babel/plugin-syntax-jsx`, `styled-components`.
  3. CSS files - handled by `style-loader` and `css-loader`.

- **Plugins:**
  1. `Dotenv` - Enables the use of system-wide environment variables in React.
  2. `BannerPlugin` - Adds a header comment to the output files.
  3. `CleanWebpackPlugin` - Cleans the output directory before building the files.
  4. `CopyPlugin` - Takes care of copying specified files from the source to the destination folder.
  5. `ZipFilesPlugin` - Zips the application into a file when production mode is enabled.

- **Watch Options:** The option starts the webpack in watch mode. It is set to ignore the `node_modules` folder. 

- **Other Information:** A predefined list of used dependencies are retrieved from `package.json` file and incorporated within the header comment. The banner header also includes the library name, its version, license info, and a URL.

The overall build process managed by this file allows for efficient bundling and packaging of a Chrome extension.