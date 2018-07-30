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
const fs = require('fs');
const axios = require('axios');
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
    * @param {String} file - the name (path) of the .cto file or a string of the model
    * @param {Array} primitiveTypes - An optional array of primitive types
    * @param {Object} styles - Custom class names fo
    * @private
    */
    constructor(file, primitiveTypes = [], styles = {}) {
        this.file = file;
        this.model = null;
        this.primitiveTypes = primitiveTypes.length < 1
        ? ['Integer', 'Long', 'DateTime', 'String', 'Boolean', 'Double']
        : primitiveTypes;
        this.typeToFormElement = {
            Integer: {
                element: 'input',
                type: 'number'
            },
            Long: {
                element: 'input',
                type: 'number'
            },
            DateTime: {
                element: 'input',
                type: 'date'
            },
            String: {
                element: 'input',
                type: 'text'
            },
            Boolean: {
                element: 'input',
                type: 'boolean'
            },
            Double: {
                element: 'input',
                type: 'number'
            },
        };
        this.styles = styles;
        this.modelManager = new ModelManager();
        this.conceptDeclarations = [];
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
    * @param {String} url  - the URL to a zip or cto archive
    * @param {object} options - additional options
    * @return {Promise} a Promise to the instantiated business network
    */
    static async fromUrl(url, options) {
        const request = {};
        request.url = url;
        request.method = 'get';
        request.responseType = 'arraybuffer'; // Necessary for binary archives
        request.timeout = 5000;
        return await axios(request)
    .then((response) => {
        return response.data;
    }).catch(function (error) {
        if (error.response) {
            throw new Error('Request to URL ['+ url +'] returned with error code: ' + error.response.status);
        } else if (error.request) {
            throw new Error('Server did not respond for URL ['+ url +']');
        } else {
            throw new Error('Error when accessing URL ['+ url +'] ' + error.message);
        }
    });
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
            customClasses: options.customClasses
        };

        await modelFiles.forEach((file) => {
            modelManager.modelFile = file;
            modelManager.accept(visitor, param);
            const text = param.fileWriter.getBuffer();
            fs.writeFileSync('out/xxxx.html', text);

        });
        return param.fileWriter.getBuffer();
    }

}

module.exports = FormGenerator;
