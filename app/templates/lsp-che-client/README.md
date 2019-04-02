# Additional steps

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