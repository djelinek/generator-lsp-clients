# default-che-client

## Introduction

- At this time are supported only LSP servers implemented in Java.
- Other servers must be implemented by user 

## General steps

> For more informations please see: [Eclipse Che plug-in development](https://blog.codenvy.com/hands-on-with-eclipse-che-developing-the-bookmark-plugin-13a32adac1ef) and [Che Samples](https://github.com/che-samples)

## Additional steps

These steps are important to do inside yours Eclipse Che instance.

### 1. Need to add new dependency on lsp plugin to assembly pom.xml

- PATH: che/assembly/assembly-wsagent-war/pom.xml
- Example:

```
        <dependency>
            <groupId>org.eclipse.che.plugin</groupId>
            <artifactId>che-plugin-<%= userProps.bundleName %>-server</artifactId>
        </dependency>
```

### 2. Need to add new dependency on language server agent to assembly pom.xml

- PATH: che/assembly/assembly-wsmaster-war/pom.xml
- Example:

```
        <dependency>
            <groupId>org.eclipse.che</groupId>
            <artifactId>ls-<%= userProps.bundleName %>-agent</artifactId>
        </dependency>
```

### Test VS Code Extension inside Che 7

- have access to a Che instance, choose your way:
  - use che.openshift.io
  - use [Che on OpenShift](https://www.eclipse.org/che/docs/che-6/openshift-single-user.html) (it is Che 6 doc but it is working with Che 7 currently)
  - use [Che on Kubernetes](https://www.eclipse.org/che/docs/che-6/kubernetes-single-user.html) (it is Che 6 doc but it is working with Che 7 currently)
  - DO NOT use Che on Docker, the plugins mechanism of Che 7 is not working
- Create a workspace on stack "Che 7"
- (DO NOT USE View --> Find Command , call "Deploy plugin by Id" and put _vscode:extension/"provider"."extension-name"_)
