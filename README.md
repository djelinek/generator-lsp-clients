[![Github last commit](https://img.shields.io/github/last-commit/djelinek/generator-lsp-clients/master.svg?style=for-the-badge)]() [![GitHub tag](https://img.shields.io/github/tag/djelinek/generator-lsp-clients.svg?style=for-the-badge)]() [![License](https://img.shields.io/badge/license-Apache%202-blue.svg?style=for-the-badge)]() [![Gitter](https://img.shields.io/gitter/room/generator-lsp-clients/community.svg?style=for-the-badge)](https://gitter.im/generator-lsp-clients/community)

# LSP Clients Generator

The tool should be able to generate clients for the Apache Camel LSP server first. Although, it should be able to produce clients for an arbitrary LSP server.

The implemented tool should be easy to use and build on top of modern technologies and approaches.

**NOTE**: _At this time the LSP Clients Generator works only with Java servers_

## Available client templates

- VS Code
- Eclipse
- Eclipse Che

## Running the generator-lsp-clients

Create new project folder in _generator-lsp-clients_ root directory:
> mkdir my-project

Change active directory:
> cd my-project

Run generator:
> yo lsp-clients

## Running the generator-lsp-clients from Command Line

Example:
> yo lsp-clients appname=MyClient jarPath=${home}/lsp-server.jar serverID=LANGUAGE_ID_APACHE_CAMEL fileType=xml client=eclipse
