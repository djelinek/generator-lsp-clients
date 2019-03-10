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

const utils = {};

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

module.exports = utils;