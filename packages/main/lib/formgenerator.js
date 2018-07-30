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
const axios = require('axios');
const fs = require('fs');
const ModelManager = require('composer-common').ModelManager;
const Writer = require('composer-common').Writer;
const {HTMLFormVisitor} = require('./htmlformvisitor');
/**
* Used to generate a web from from a given composer model. Accepts string or file
* and assets.
*
* @class
* @memberof module:composer-form
*/
class FormGenerator {
    /**
    * Create the FormGenerator.
    *
    * @param {String} modelFileContent - the name (path) of the .cto file or a string of the model
    * @param {Object} options - form options
    * @private
    */
    constructor(modelFileContent, options) {
        this.modelManager = new ModelManager();
        this.model = modelFileContent;
        this.options = options;
        this.modelFile = null;
    }

    /**
    * Visitor design pattern
    * @param {Object} visitor - the visitor
    * @param {Object} parameters  - the parameter
    * @return {Object} the result of visiting or null
    * @private
    */
    accept(visitor, parameters) {
        return visitor.visit(this.modelFile, parameters);
    }

    /**
    * Create a template from an URL.
    * @param {String} path  - the path to a file
    * @param {object} options - additional options
    * @return {String} a composer business network file
    */
    static async fromFile(path, options) {
        const model = await fs.readFileSync(path, 'utf8');
        return FormGenerator.generateHTML(model, options);
    }

    /**
    * Create a template from an URL.
    * @param {String} text  - the model
    * @param {object} options - additional options
    * @return {String} a composer business network file
    */
    static async fromText(text, options) {
        return FormGenerator.generateHTML(text, options);
    }

    /**
    * Create a template from an URL.
    * @param {String} url  - the URL to a zip or cto archive
    * @param {object} options - additional options
    * @return {Promise} a Promise to the instantiated business network
    */
    static async fromUrl(url, options) {
        const request = {};
        request.url = url;
        request.method = 'get';
        request.responseType = 'text';
        request.timeout = 5000;

        try {
            const response = await axios(request);
            let text = await response.data.toString('utf8');
            return this.generateHTML(text, options);
        } catch (error) {
            if (error.response) {
                throw new Error('Request to URL ['+ url +'] returned with error code: ' + error.response.status);
            } else if (error.request) {
                throw new Error('Server did not respond for URL ['+ url +']');
            } else {
                throw new Error('Error when accessing URL ['+ url +'] ' + error.message);
            }
        }
    }

    /**
    * The typescript code generator
    * @return {String} the generated HTML string
    */
    async generateHTML () {
        const {model, modelManager, options} = this;
        modelManager.clearModelFiles();

        modelManager.addModelFile(model, undefined, true);
        modelManager.updateExternalModels();
        const modelFiles = modelManager.getModelFiles();


        let visitor = new HTMLFormVisitor ();
        const param = {
            fileWriter: new Writer(),
            customClasses: options.customClasses,
            timestamp: Date.now()

        };
        let result = '';
        let res = {};
        await modelFiles.forEach((file) => {
            modelManager.modelFile = file;
            modelManager.accept(visitor, param);
            const text = param.fileWriter.getBuffer();
            result += `\n${text}`;
            res[file.namespace] = text;

        });
        return result;
    }

    /**
    * The typescript code generator
    * @private
    * @param {Object} model - The business network model text
    * @param {Object} options - form options
    * @return {String} the generated HTML string
    */
    static async generateHTML (model, options) {
        let modelManager = new ModelManager();
        modelManager.clearModelFiles();

        modelManager.addModelFile(model, undefined, true);
        modelManager.updateExternalModels();
        const modelFiles = modelManager.getModelFiles();


        let visitor = new HTMLFormVisitor ();
        const param = {
            fileWriter: new Writer(),
            customClasses: options.customClasses,
            timestamp: Date.now()

        };
        let result = '';
        let res = {};
        await modelFiles.forEach((file) => {
            modelManager.modelFile = file;
            modelManager.accept(visitor, param);
            const text = param.fileWriter.getBuffer();
            result += `\n${text}`;
            res[file.namespace] = text;

        });
        return result;
    }

}

module.exports = FormGenerator;
