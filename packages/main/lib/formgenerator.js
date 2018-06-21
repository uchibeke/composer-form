/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const debug = require('debug')('hyperledger-composer');
const fs = require('fs');
const { ModelManager } = require('composer-common');

/**
 * Use the Factory to create instances of Resource: transactions, participants
 * and assets.
 *
 * @class
 * @memberof module:composer-form
 */
class FormGenerator {
  /**
     * Create the FormGenerator.
     *
     * @param {String} fileName - the name (path) of the .cto file
     * @private
     */
    constructor (fileName) {
        this.fileName = fileName;
    }

    /**
       * Import model from a file
       * @private
       * @return {modelFiles} the new reusable html form
       */
    async fetchModel () {
        const modelManager = new ModelManager();
        modelManager.clearModelFiles();
        let modelBase = fs.readFileSync(this.fileName, 'utf8');
        modelManager.addModelFile(modelBase, this.fileName, true);
        await modelManager.updateExternalModels();
        let modelFiles = modelManager.getModelFiles();

        debug('New Form created %s', modelFiles);
        return modelFiles;
    }

    /**
       * Generates a new HTML form from a given model file
       * @return {form} the new reusable html form
       */
    async form () {
        const modelJson = this.fetchModel();

        // TODO keep working
        let form = modelJson;
        return form;
    }
}

module.exports = FormGenerator;
