File Documentation:

`online-endpoints.sh` is a shell script residing under the directory `/app/filebot-store-000/chrome-extension/`. This script is designed for deployment in environments where server URLs need to be updated. It helps in replacing the local server URLs that are generally used during development with the appropriate and respective production URLs.

The script uses the `sed` command to replace instances of "http://localhost:4000" with the production URL "https://turbosrc-service.fly.dev" in two files: src/inject.js and src/requests.js.

Notably, there are commented out lines in the script that also might have replaced "localhost" URLs with their production counterparts for authentication module, possibly pointing to a further planned update in the script. 

### Usage:
- The script should be executed when the application is ready to be deployed or needs to connect with the production servers i.e. 'turbosrc-service.fly.dev'. 
- It helps in ensuring that the Chrome extension can correctly identify and interact with the given production endpoints instead of locally hosted servers.