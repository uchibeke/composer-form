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
const {
  ModelManager,
  FileWriter,
} = require('composer-common');
const forms = require('forms');
const fields = forms.fields;
const validators = forms.validators;
let widgets = forms.widgets;
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
   * The typescript code generator
   * @param {Object} modelFiles - An array of model files
   */
    generateCode (modelFiles) {
        let visitor = new HTMLFormVisitor ();
        const param = {
            fileWriter: new FileWriter('./out/generated_2')
        };

        modelFiles.forEach((file) => {
            this.modelFile = file;
            this.accept(visitor, param);
        });
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
   * Generates a new HTML form from a given model file or string
   * @return {form} the new reusable html form
   */
    async form() {
        await this.fetchModel();
        const props = this.model;
        let obj = {};
        props.forEach((prop, key) => {
            obj[prop.name] = fields.string(this.field(prop));
        });
        const formObject = forms.create(obj);
        const form = `<form> ${formObject.toHTML()} </form>`;
        return form;
    }

  /**
   * Generate a form field from the type property
   *
   * @param {Object} property - the object that defines the property and it's field type
   * @return {Object} The form field meta data to be used to create a form
   * @private
   */
    field(property) {
        const {typeToFormElement, styles} = this;
        if (this.primitiveTypes.indexOf(property.type) > -1) {
            const mapping = typeToFormElement[property.type];
            const formOpts = {
                required: property.optional
                        ? false
                        : validators.required(`REQUIRED. Please, enter ${property.name}`),
                widget: widgets[mapping.type]({
                    classes: [styles.input]
                }),
                errorAfterField: true,
                cssClasses: {
                    label: [styles.label],
                    field: [styles.field]
                }
            };
            return this.field(formOpts);
        } else {
            // TODO: Handle non-primitives later. Set fields to text for now
            const toRet = {
                required: property.optional
                    ? false
                    : validators.required(`REQUIRED. Please, enter ${property.name}`),
                widget: widgets.text({
                    classes: [styles.input]
                }),
                errorAfterField: true,
                cssClasses: {
                    label: [styles.label],
                    field: [styles.field]
                }
            };
            return toRet;
        }

    }

    /**
     * Import model from a file or string
     * @private
     * @return {props} the proporties of a composer type
     */
    async fetchModel() {
        let {file, modelManager} = this;
        modelManager.clearModelFiles();
        let modelBase = fs.existsSync(file)
              ? fs.readFileSync(file, 'utf8')
              : file;
        modelManager.addModelFile(modelBase, undefined, true);
        await modelManager.updateExternalModels();
        let modelFiles = modelManager.getModelFiles();
        debug('New Form created %s', modelFiles);


        const assetDcl = modelManager.getAssetDeclarations(false);
        let fqns = [];
        assetDcl.forEach((asset, key)=> {
            fqns.push(asset.fqn);
        });
        this.conceptDeclarations = modelManager.getConceptDeclarations();

        const namespaces = modelManager.getNamespaces();
        const namespace = namespaces[1];
        const typesInBond = modelManager.getType(namespace + '.Bond');

        this.generateCode (modelFiles);

        const props = typesInBond.properties;
        this.model = props;
        return props;
    }

}

module.exports = FormGenerator;
