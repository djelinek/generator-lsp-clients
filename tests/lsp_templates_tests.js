/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');
var basicProps = {};

describe('lsp-clients:app', function () {

    /**
     * VS Code template
     */
    describe('Should properly scaffold with default config for *java* servers for *vscode* client?', function () {

        before(function () {
          basicProps.name = 'MyLSPClient';
          basicProps.serverType = 'java';
          basicProps.jarPath = path.join(__dirname, '../tests/resources/xml-server.jar');
          basicProps.serverID = 'xml';
          basicProps.fileType = 'xml';
          basicProps.client = "lsp-vscode-client";
    
          return helpers.run(path.join(__dirname, '../app'))
            .inTmpDir(function (dir) {
              var done = this.async(); // `this` is the RunContext object.
              fs.copy(path.join(__dirname, '../templates'), dir, done);
            })
            .withPrompts({ name: basicProps.name })
            .withPrompts({ serverType: basicProps.serverType })
            .withPrompts({ jarPath: basicProps.jarPath })
            .withPrompts({ serverID: basicProps.serverID })
            .withPrompts({ fileType: basicProps.fileType })
            .withPrompts({ client: basicProps.client })
            .toPromise();
        });
    
        it('Should create the basic structure?', function () {
          assert.file('README.md');
          assert.file('package.json');
          assert.file('package-lock.json');
          assert.file('language-configuration.json');
          assert.file('.project');
          assert.file('gulpfile.js');
          assert.file('tsconfig.json');
          assert.file('tslint.json');
          assert.file('.vscode/extensions.json');
          assert.file('.vscode/launch.json');
          assert.file('.vscode/settings.json');
          assert.file('.vscode/tasks.json');
          assert.file('src/extension.ts');
          assert.file('libs/README.md');
          assert.file('libs/lsp-server.jar');
        });

        it('Should create src/extension.ts with default content?', function () {
            assert.fileContent('src/extension.ts', new RegExp('LANGUAGE_CLIENT_ID = \'' + basicProps.serverID + '\''));
            assert.fileContent('src/extension.ts', new RegExp('LANGUAGE_CLIENT_NAME = \'' + basicProps.name.toLowerCase() + '\''));
        });
      });

      /**
       * Theia template
       */
      describe('Should properly scaffold with default config for *java* servers for *theia* client?', function () {

        before(function () {
          basicProps.name = 'MyLSPClient';
          basicProps.serverType = 'java';
          basicProps.jarPath = path.join(__dirname, '../tests/resources/xml-server.jar');
          basicProps.serverID = 'xml';
          basicProps.fileType = 'xml';
          basicProps.client = "lsp-theia-client";
    
          return helpers.run(path.join(__dirname, '../app'))
            .inTmpDir(function (dir) {
              var done = this.async(); // `this` is the RunContext object.
              fs.copy(path.join(__dirname, '../templates'), dir, done);
            })
            .withPrompts({ name: basicProps.name })
            .withPrompts({ serverType: basicProps.serverType })
            .withPrompts({ jarPath: basicProps.jarPath })
            .withPrompts({ serverID: basicProps.serverID })
            .withPrompts({ fileType: basicProps.fileType })
            .withPrompts({ client: basicProps.client })
            .toPromise();
        });
    
        it('Should create the basic structure?', function () {
          assert.file('README.md');
          assert.file('package.json');
          assert.file('package-lock.json');
          assert.file('language-configuration.json');
          assert.file('.project');
          assert.file('gulpfile.js');
          assert.file('tsconfig.json');
          assert.file('tslint.json');
          assert.file('.vscode/extensions.json');
          assert.file('.vscode/launch.json');
          assert.file('.vscode/settings.json');
          assert.file('.vscode/tasks.json');
          assert.file('src/extension.ts');
          assert.file('libs/README.md');
          assert.file('libs/lsp-server.jar');
        });

        it('Should create src/extension.ts with default content?', function () {
            assert.fileContent('src/extension.ts', new RegExp('LANGUAGE_CLIENT_ID = \'' + basicProps.serverID + '\''));
            assert.fileContent('src/extension.ts', new RegExp('LANGUAGE_CLIENT_NAME = \'' + basicProps.name.toLowerCase() + '\''));
        });
      });

      /**
       * Eclipe Che template
       */
      describe('Should properly scaffold with default config for *java* servers for *che* client?', function () {

        before(function () {
          basicProps.name = 'MyLSPClient';
          basicProps.serverType = 'java';
          basicProps.jarPath = path.join(__dirname, '../tests/resources/xml-server.jar');
          basicProps.serverID = 'xml';
          basicProps.fileType = 'xml';
          basicProps.client = "lsp-che-client";
    
          return helpers.run(path.join(__dirname, '../app'))
            .inTmpDir(function (dir) {
              var done = this.async(); // `this` is the RunContext object.
              fs.copy(path.join(__dirname, '../templates'), dir, done);
            })
            .withPrompts({ name: basicProps.name })
            .withPrompts({ serverType: basicProps.serverType })
            .withPrompts({ jarPath: basicProps.jarPath })
            .withPrompts({ serverID: basicProps.serverID })
            .withPrompts({ fileType: basicProps.fileType })
            .withPrompts({ client: basicProps.client })
            .toPromise();
        });
    
        it('Should create the basic structure?', function () {
          assert.file('README.md');
          assert.file('ls-' + basicProps.name.toLowerCase() + '/pom.xml');
          assert.file('ls-' + basicProps.name.toLowerCase() + '/src/main/resources/installers/1.0.0/org.eclipse.che.ls.' + basicProps.name.toLowerCase() + '.json');
          assert.file('ls-' + basicProps.name.toLowerCase() + '/src/main/resources/installers/1.0.0/org.eclipse.che.ls.' + basicProps.name.toLowerCase() + '.script.sh');
          assert.file('plugin-' + basicProps.name.toLowerCase() + '/pom.xml');
          assert.file('plugin-' + basicProps.name.toLowerCase() + '/che-plugin-' + basicProps.name.toLowerCase() + '-server/pom.xml');
          assert.file('plugin-' + basicProps.name.toLowerCase() + '/che-plugin-' + basicProps.name.toLowerCase() + '-server/src/main/java/org/eclipse/che/plugin/' + basicProps.name.toLowerCase() + '/server/inject/LSPGeneratorModule.java');
          assert.file('plugin-' + basicProps.name.toLowerCase() + '/che-plugin-' + basicProps.name.toLowerCase() + '-server/src/main/java/org/eclipse/che/plugin/' + basicProps.name.toLowerCase() + '/server/languageserver/LSPGeneratorLanguageServerConfig.java');
          assert.file('libs/README.md');
          assert.file('libs/lsp-server.jar');
        });

        it('Should create ls-agent pom.xml with default content?', function () {
            assert.fileContent('ls-' + basicProps.name.toLowerCase() + '/pom.xml', new RegExp('<artifactId>ls-' + basicProps.name.toLowerCase() + '-agent</artifactId>'));
        });

        it('Should create plugin pom.xml with default content?', function () {
            assert.fileContent('plugin-' + basicProps.name.toLowerCase() + '/pom.xml', new RegExp('<artifactId>che-plugin-' + basicProps.name.toLowerCase() + '-parent</artifactId>'));
            assert.fileContent('plugin-' + basicProps.name.toLowerCase() + '/pom.xml', new RegExp('<module>che-plugin-' + basicProps.name.toLowerCase() + '-server</module>'));
        });
      });

      /**
       * Eclipse template
       */
      describe('Should properly scaffold with default config for *java* servers for *eclipse* client?', function () {

        before(function () {
          basicProps.name = 'MyLSPClient';
          basicProps.serverType = 'java';
          basicProps.jarPath = path.join(__dirname, '../tests/resources/xml-server.jar');
          basicProps.serverID = 'xml';
          basicProps.fileType = 'xml';
          basicProps.client = "lsp-eclipse-client";
    
          return helpers.run(path.join(__dirname, '../app'))
            .inTmpDir(function (dir) {
              var done = this.async(); // `this` is the RunContext object.
              fs.copy(path.join(__dirname, '../templates'), dir, done);
            })
            .withPrompts({ name: basicProps.name })
            .withPrompts({ serverType: basicProps.serverType })
            .withPrompts({ jarPath: basicProps.jarPath })
            .withPrompts({ serverID: basicProps.serverID })
            .withPrompts({ fileType: basicProps.fileType })
            .withPrompts({ client: basicProps.client })
            .toPromise();
        });
    
        it('Should create the basic structure?', function () {
          assert.file('README.md');
          assert.file('pom.xml');
          assert.file('plugin.xml');
          assert.file('build.properties');
          assert.file('.project');
          assert.file('.gitignore');
          assert.file('.classpath');
          assert.file('OSGI-INF/l10n/bundle.properties');
          assert.file('META-INF/MANIFEST.MF');
          assert.file('src/org/vutbr/lsp/client/Activator.java');
          assert.file('src/org/vutbr/lsp/client/LSPStreamConnectionProvider.java');
          assert.file('src/org/vutbr/lsp/java/completion/JavaCompletionProposalComputer.java');
          assert.file('src/org/vutbr/lsp/xml/completion/XMLCompletionProposalComputer.java');
          assert.file('libs/README.md');
          assert.file('libs/lsp-server.jar');
        });

        it('Should create pom.xml with default content?', function () {
            assert.fileContent('pom.xml', new RegExp('<name>' + basicProps.name.toLowerCase() + '</name>'));
        });

        it('Should create plugin.xml with default content?', function () {
            assert.fileContent('plugin.xml', new RegExp('languageId=\"' + basicProps.serverID + '\"'));
        });
      });
});