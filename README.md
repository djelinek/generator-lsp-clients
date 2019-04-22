[![Github last commit](https://img.shields.io/github/last-commit/djelinek/generator-lsp-clients/master.svg?style=for-the-badge)]() [![GitHub tag](https://img.shields.io/github/tag/djelinek/generator-lsp-clients.svg?style=for-the-badge)]() [![License](https://img.shields.io/badge/license-Apache%202-blue.svg?style=for-the-badge)]() [![Gitter](https://img.shields.io/gitter/room/generator-lsp-clients/community.svg?style=for-the-badge)](https://gitter.im/generator-lsp-clients/community)

# LSP Clients Generator

The tool should be able to generate clients for the Apache Camel LSP server first. Although, it should be able to produce clients for an arbitrary LSP server.

The implemented tool should be easy to use and build on top of modern technologies and approaches.

**NOTE**: _At this time the LSP Clients Generator works only with Java servers_

## Available client templates

- [x] VS Code
- [x] Eclipse
- [x] Eclipse Che
- [x] Theia

## Running the generator-lsp-clients

Create new project folder in _generator-lsp-clients_ root directory:
> mkdir my-project

Change active directory:
> cd my-project

Run generator:
> yo lsp-clients

## Running the generator-lsp-clients from Command Line

Java servers example:
> yo lsp-clients \\<br/>
&nbsp;&nbsp;appname=MyClient \\<br/>
&nbsp;&nbsp;serverType=java \\<br/> 
&nbsp;&nbsp;jarPath=${home}/lsp-server.jar \\<br/>
&nbsp;&nbsp;serverID=LANGUAGE_ID_APACHE_CAMEL \\<br/>
&nbsp;&nbsp;fileType=xml,java \\<br/>
&nbsp;&nbsp;client=eclipse

Other servers example:
> yo lsp-clients \\<br/>
&nbsp;&nbsp;appname=MyClient \\<br/>
&nbsp;&nbsp;serverType=other \\<br/>
&nbsp;&nbsp;client=eclipse

## Running the Mocha tests

First you must install mocha with npm.
> npm install --global mocha

Then, in the main generator-lsp-clients directory:
> npm test
