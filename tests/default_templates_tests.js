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

describe('default-lsp-clients:app', function () {

    describe('Should properly scaffold with default config for *other* servers for *vscode* client?', function () {

        before(function () {
          basicProps.name = 'MyLSPClient';
          basicProps.serverType = 'other';
          basicProps.client = "default-vscode-client"
    
          return helpers.run(path.join(__dirname, '../app'))
            .inTmpDir(function (dir) {
              var done = this.async(); // `this` is the RunContext object.
              fs.copy(path.join(__dirname, '../templates'), dir, done);
            })
            .withPrompts({ name: basicProps.name })
            .withPrompts({ serverType: basicProps.serverType })
            .withPrompts({ client: basicProps.client })
            .toPromise();
        });
    
        it('Should create the basic structure', function () {
          assert.file('README.md');
          assert.file('libs/README.md');
        });
      });

      describe('Should properly scaffold with default config for *other* servers for *eclipse* client?', function () {

        before(function () {
          basicProps.name = 'MyLSPClient';
          basicProps.serverType = 'other';
          basicProps.client = "default-eclipse-client"
    
          return helpers.run(path.join(__dirname, '../app'))
            .inTmpDir(function (dir) {
              var done = this.async(); // `this` is the RunContext object.
              fs.copy(path.join(__dirname, '../templates'), dir, done);
            })
            .withPrompts({ name: basicProps.name })
            .withPrompts({ serverType: basicProps.serverType })
            .withPrompts({ client: basicProps.client })
            .toPromise();
        });
    
        it('Should create the basic structure', function () {
          assert.file('README.md');
          assert.file('libs/README.md');
        });
      });

      describe('Should properly scaffold with default config for *other* servers for *eclipse-che* client?', function () {

        before(function () {
          basicProps.name = 'MyLSPClient';
          basicProps.serverType = 'other';
          basicProps.client = "default-che-client"
    
          return helpers.run(path.join(__dirname, '../app'))
            .inTmpDir(function (dir) {
              var done = this.async(); // `this` is the RunContext object.
              fs.copy(path.join(__dirname, '../templates'), dir, done);
            })
            .withPrompts({ name: basicProps.name })
            .withPrompts({ serverType: basicProps.serverType })
            .withPrompts({ client: basicProps.client })
            .toPromise();
        });
    
        it('Should create the basic structure', function () {
          assert.file('README.md');
          assert.file('libs/README.md');
        });
      });

      describe('Should properly scaffold with default config for *other* servers for *theia* client?', function () {

        before(function () {
          basicProps.name = 'MyLSPClient';
          basicProps.serverType = 'other';
          basicProps.client = "default-theia-client"
    
          return helpers.run(path.join(__dirname, '../app'))
            .inTmpDir(function (dir) {
              var done = this.async(); // `this` is the RunContext object.
              fs.copy(path.join(__dirname, '../templates'), dir, done);
            })
            .withPrompts({ name: basicProps.name })
            .withPrompts({ serverType: basicProps.serverType })
            .withPrompts({ client: basicProps.client })
            .toPromise();
        });
    
        it('Should create the basic structure', function () {
          assert.file('README.md');
          assert.file('libs/README.md');
        });
      });
});