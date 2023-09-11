<<<<<<< HEAD
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
=======
This is a Webpack configuration file for a chrome extension project. It defines the entry point for the application, provides the rules for handling different types of files, specifies output details and contains a sequence of Webpack plugins used to enhance the build process. The file also includes a function to dynamically add plugins based on the build mode.

Key parts of the module:

1. **Entry:** Indicates where Webpack should start building the project. In this case, there are two entry points, `src/popup.js` and `src/inject.js`.
  
2. **Output:** Specifies where to emit the compiled bundles. Output files will be placed in a `dist` directory and named based on their entry configuration (`[name].bundle.js`).

3. **Rules:** Series of loaders are defined here. `babel-loader` is used to transpile JavaScript files using Babel and webpack, `css-loader` interprets `@import` and `url()` like import/require() causing them to be resolved by webpack and `style-loader` adds CSS to the DOM by injecting a `<style>` tag.

4. **Plugins:** A variety of plugins are used such as Dotenv for using environment variables, CleanWebpackPlugin to clean the build directory, CopyPlugin to copy individual files or entire directories to the build directory and ZipFilesPlugin to zip the files when built in production mode. A function `addPlugins(argv)` dynamically adds plugins depending on the mode of build.

5. **WatchOptions:** Configuration for webpack's watcher feature which triggers a rebuild as soon as some code has changed. 

6. **Dependencies:** It lists all package dependencies from `package.json` file and display them in the banner comment header.
>>>>>>> routeClientModeAndOnline
