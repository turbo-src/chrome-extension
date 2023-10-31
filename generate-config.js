const fs = require('fs');
const path = require('path');

// Load the desired config file based on the environment
const env = process.env.TSRC_EXT_NODE_ENV || 'devLocal';
const configFilePath = path.join(__dirname, `config.${env}.json`);
const config = require(configFilePath);

// Add the myGithubName, myTurboSrcID, and currentVersion constants if they exist in the config file
if (config.myGithubName) {
    config.myGithubName = config.myGithubName;
}
if (config.myTurboSrcID) {
    config.myTurboSrcID = config.myTurboSrcID;
}
if (config.currentVersion) {
    config.currentVersion = config.currentVersion;
}

// Generate a JavaScript file with the required variables
const configJs = `const CONFIG = ${JSON.stringify(config)};
module.exports = CONFIG;`;
fs.writeFileSync(path.join(__dirname, 'src', 'config.js'), configJs);

// Check if cypress.env.json exists, and if not, create it
const cypressEnvJsonPath = path.join(__dirname, 'cypress.env.json');
if (!fs.existsSync(cypressEnvJsonPath)) {
    const cypressEnvJson = {};
    fs.writeFileSync(cypressEnvJsonPath, JSON.stringify(cypressEnvJson, null, 2));
    console.log('Created cypress.env.json in the project root.');
}

console.log()
console.log('\033[1mturbosrc build mode:\033[0m \033[33m%s\033[0m', env);
console.log()
console.log('config file:', configFilePath)
console.log('# Begin config file contents')
console.log(configJs)
console.log('# End')