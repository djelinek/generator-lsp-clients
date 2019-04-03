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

var yeoman = require('yeoman-generator');
var glob = require('glob');
var path = require('path');
var utils = require('./utils');

// const defaultJarPath = "/Users/djelinek/develop/tmp/camel-lsp-server-1.1.0-SNAPSHOT.jar";
// const defaultServerID = "LANGUAGE_ID_APACHE_CAMEL";
// const defaultFileTypes = "xml";
// const defaultClient = 'eclipse';

function consoleHeader() {
  var pjson = require('../package.json');
  console.log('                        __   _____ ____    ');
  console.log('                       / /  / ___// __ \\  ');
  console.log('                      / /   \\__ \\/ /_/ / ');
  console.log('                     / /______/ / ____/    ');
  console.log('                    /_____/____/_/         ');
  console.log('        _________            __            ');
  console.log('       / ____/ (_)__  ____  / /______      ');
  console.log('      / /   / / / _ \\/ __ \\/ __/ ___/    ');
  console.log('     / /___/ / /  __/ / / / /_(__  )       ');
  console.log('     \\____/_/_/\\___/_/ /_/\\__/____/     ');

  console.log(' ----------------------------------------- ');
  console.log('          LSP Clients Generator');
  console.log('             Version: ' + pjson.version);
  console.log(' ----------------------------------------- ');
  console.log('');
}

module.exports = class extends yeoman {

  constructor(args, opts) {
    super(args, opts);
    // base arguments
    this.argument('appname', { type: String, required: false });
    this.argument('jarPath', { type: String, required: false });
    this.argument('serverID', { type: String, required: false });
    this.argument('fileType', { type: String, required: false });
    this.argument('client', { type: String, required: false });
  }

  prompting() {
    // default setting is show user prompts
    var showPrompts = true;

    if (utils.isNotNull(this.options.appname) &&
      utils.isNotNull(this.options.jarPath) &&
      utils.isNotNull(this.options.serverID) &&
      utils.isNotNull(this.options.fileType) &&
      utils.isNotNull(this.options.client)) {
      // no prompts
      showPrompts = false;
    }

    // show tittle banner logo
    if (showPrompts) {
      consoleHeader();
    }

    // sets default prompts values
    var defaultProject = utils.setDefault(this.appname, this.options.appname);
    var defaultJarPath = utils.setDefault(defaultJarPath, this.options.jarPath);
    var defaultServerID = utils.setDefault(defaultServerID, this.options.serverID);
    var defaultFileType = utils.setDefault(defaultFileType, this.options.fileType);
    var defaultClient = utils.setDefault(defaultClient, this.options.client);

    // show prompts question fields
    var questions = [
      {
        type: 'input',
        name: 'name',
        message: 'LSP client name?',
        default: utils.replaceAll(defaultProject, ' ', '-')
      },
      {
        type: 'input',
        name: 'jarPath',
        message: 'Path to LSP server (.jar)?',
        default: defaultJarPath,
        validate: utils.validateJarPath,
        store: true
      },
      {
        type: 'input',
        name: 'serverID',
        message: 'LSP server ID?',
        default: defaultServerID,
        store: true
      },
      {
        type: 'checkbox',
        name: 'fileType',
        message: 'Supported file extensions?',
        choices: ['xml', 'java'],
        default: defaultFileType,
        validate: (value) => {
          return utils.validateFileType(value);
        },
        store: true
      },
      {
        type: 'list',
        name: 'client',
        message: 'LSP client for?',
        choices: [
          {
            name: 'vscode',
            value: 'lsp-vscode-client'
          },
          {
            name: 'eclipse',
            value: 'lsp-eclipse-client'
          },
          {
            name: 'eclipse-che',
            value: 'lsp-che-client'
          }],
        default: defaultClient,
        store: true
      }
    ];

    // link user answers to appropriate generator variables
    if (showPrompts) {
      return this.prompt(questions).then(function (props) {
        this.appname = utils.replaceAll(props.name, ' ', '-');
        this.jarPath = props.jarPath;
        this.serverID = props.serverID;
        this.fileType = props.fileType;
        this.client = props.client;
      }.bind(this));
    } else {
      // link command line parameters to appropriate generator variables
      this.appname = utils.replaceAll(defaultProject, ' ', '-');
      this.jarPath = defaultJarPath;
      this.serverID = defaultServerID;
      this.fileType = defaultFileType;
      this.client = utils.validateClientTemplateMask(defaultClient);
    }
  }

  // writing logic here
  writing() {
    // get path to specific template
    var myTemplatePath = path.join(this.templatePath(), this.client);
    this.folders = glob.sync('**/*/', { cwd: myTemplatePath });
    this.files = glob.sync('**/*', { cwd: myTemplatePath, nodir: true });

    // set source root folder to appropriate template
    this.sourceRoot(myTemplatePath);

    this.log('Generating client files...');
    var userProps = {};
    userProps.bundleName = utils.replaceAll(this.appname, ' ', '-').toLowerCase();
    userProps.jarPath = this.jarPath;
    userProps.serverID = this.serverID;
    userProps.fileType = this.fileType;
    userProps.client = this.client;
    // additional user props for client template
    userProps.runJar = 'java -jar';
    userProps.runJarField = userProps.runJar.split(' ');
    userProps.bundleVendor = 'LSP Client Generator by Red Hat';

    // copy all template files
    for (var i = 0; i < this.files.length; i++) {
      this.fs.copyTpl(
        this.templatePath(this.files[i]),
        this.destinationPath(this.files[i]),
        { userProps: userProps }
      );
    }

    // copy JAR file of existing LSP server written in Java language
    this.log('Copying LSP server to client resources...');
    this.fs.copy(this.jarPath, path.join(this.destinationPath(), 'libs', 'lsp-server.jar'));

    // set all additional user props
    // TO-DO...

  }
};
