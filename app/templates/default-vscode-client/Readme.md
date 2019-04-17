# default-vscode-client

## Introduction

- At this time are supported only LSP servers implemented in Java.
- Other servers must be implemented by user 

## General steps 

1. Create new VS Code extension - [Development guide](https://code.visualstudio.com/api/get-started/your-first-extension)
2. Add required client capabilities (definition of each section is located inside manifest file _package.json_)
    - _activationEvent_ - contains file types listeners (e.g. for XML files with endings _.xml_)
    - _contributes_ - closer specification of supported language
    - _dependencies_ - constains dependencies on other extensions (at least _vscode_ and _vscode-languageclient_)
3. Download and place language server to plugin resources (e.g. _${path}/project_name/libs/_)
4. Implementation of root client file - _extensions.ts_, used for starting server, establish connection with server and communication with server by library _Node SDK_ and application interface _Extension API_

> For more informations please see: [VS Code LSP Client tutorial](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide) and [LSP samples](https://github.com/Microsoft/vscode-extension-samples/tree/master/lsp-sample)

## Packaging

> npm link (npm audit fix)

> npm install -g vsce

> vsce package

## How to install

> code --install-extension bundlename-0.0.1.vsix
