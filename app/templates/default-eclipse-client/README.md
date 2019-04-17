# default-eclipse-client

## Introduction

- At this time are supported only LSP servers implemented in Java.
- Other servers must be implemented by user 

## General steps 

1. Create a new Eclipse plug-in (see [Eclipse development tutorial](https://www.vogella.com/tutorials/EclipsePlugin/article.html))
2. Add required client dependencies (definitions inside _MANIFEST.MF_)
    - org.eclipse.lsp4e
    - org.eclipse.lsp4j
    - org.eclipse.wst.sse.ui
    - org.eclipse.wst.xml.ui
3. Add required extensions to _plugin.xml_
    - org.eclipse.lsp4e.languageServer - identification of running server by string identifier _languageId_
    - org.eclipse.wst.sse.ui.completionProposal
4. Download and place language server to plugin resources (e.g. _${path}/project_name/libs/_)
5. Implementation of Java class for running LSP server and establish a new server connection by libraries LSP4J and LSP4E
    - org.eclipse.lsp4e.server.ProcessStreamConnectionProvider
6. Implementation of Java classes for required language support
    - org.eclipse.lsp4e.operations.completion.LSContentAssistProcessor

> For more informations see: [LSP4J_TUtorial](https://github.com/LucasBullen/LSP4J_Tutorial)

## Packaging

> mvn clean package

## Installation

> copy 'lsp.client-1.0.0-SNAPSHOT.jar' into 'plugins' folder of your Eclipse local installation
