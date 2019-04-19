# default-theia-client

## Packaging

> npm link (npm audit fix)

> npm install -g vsce

> vsce package

## How to install

### a non published VS Code extension

Follow instructions [here](https://github.com/theia-ide/theia/wiki/Testing-VS-Code-extensions)

### a published VS Code extension

In this case, it might be more straightforward to use the "Deploy plugin by ID" command with a Dockerized Theia.

Start theia-full as indicated [here](https://github.com/theia-ide/theia-apps#theia-docker):

docker run -it -p 3000:3000 -v "$(pwd):/home/project:cached" theiaide/theia-full:next

Go to http://localhost:3000

Activate Command palette, (View -> Find command...) and use _Plugin: Deploy plugin by Id_

Provide _vscode:extension/"provider"."extension-name"_