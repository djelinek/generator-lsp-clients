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

const chalk = require('chalk');
const fs = require('fs');
const utils = {};

utils.replaceAll = function replaceAll(str, search, replacement) {
    return str.split(search).join(replacement);
}

utils.isEmpty = function isEmpty(str) {
    return (!str || 0 === str.length);
}

utils.isNotNull = function isNotNull(object) {
    return (object != null);
}

utils.isNull = function isNull(object) {
    return (object == null);
}

utils.setDefault = function setDefault(baseDefault, optionDefault) {
    var newDefault = baseDefault;
    if (!utils.isEmpty(optionDefault)) {
        var index = optionDefault.indexOf('=');
        newDefault = optionDefault.substring(index+1, optionDefault.length);
    }
    return newDefault;
}

utils.validateFileType = function validateFileType(value) { 
    const isXML = value.includes('xml');
    const isJava = value.includes('java');
    let returnValue;
    if (!isXML && !isJava) {
        returnValue = chalk.red('File extensions must be at least one of - [\'xml\'\, \'java\'].');
    } else {
        returnValue = true;
    }
    return returnValue;
}

utils.validateJarPath = function validateJarPath(jarPath) {
    const f = fs.readFileSync(jarPath);
    let returnValue;
    if (typeof f === "undefined") {
        returnValue = chalk.red('Specified path to server \'.jar\' file is not valid.');
    } else {
        returnValue = true;
    }
    return returnValue;
}

utils.validateClientTemplateMask = function validateClientTemplateMask(mask) {
    let returnValue
    if(mask.match('vscode')) {
        returnValue = 'lsp-vscode-client'; 
    } else if(mask.match('che')) {
        returnValue = 'lsp-che-client';
    } else {
        returnValue = 'lsp-eclipse-client';
    }
    return returnValue;
}

module.exports = utils;