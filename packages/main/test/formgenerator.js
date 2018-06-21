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

const Generator = require('../lib/formgenerator');

// const assert = require('assert')
require('chai').should();
// const fs = require('fs')

describe('formgenerator Tests', function () {
    describe('#validation', function () {
        it('form property validation', async function () {
            let fileName = './test/samples/models/bond.cto';
            // form generator was created
            const FormGenerator = new Generator(fileName);
            FormGenerator.should.not.be.null;

            // Check generator files
            const form = FormGenerator.form();
            console.log(await form);

            //   let modelBase = fs.readFileSync(fileName, 'utf8')
            //   modelBase.should.not.be.null
            //   modelManager.addModelFile(modelBase, fileName)

            //   // check functions can be retrieved
            //   const modelFile = modelManager.getModelFile('org.acme.base')
            //   modelFile.should.not.be.null

            //   // check abstract classes are marked as abstract
            //   const abstractAsset = modelManager.getType('org.acme.base.AbstractAsset')
            //   abstractAsset.should.not.be.null
            //   abstractAsset.isAbstract().should.be.true

            //   // check we can get a concept
            //   const addressConcept = modelManager.getType('org.acme.base.Address')
            //   addressConcept.should.not.be.null
            //   addressConcept.isAbstract().should.be.true

            //   // check we can get a concept
            //   const unitedStatesAddressConcept = modelManager.getType('org.acme.base.UnitedStatesAddress')
            //   unitedStatesAddressConcept.should.not.be.null
            //   unitedStatesAddressConcept.isAbstract().should.be.false

            //   // check both concepts are registered
            //   modelManager.getConceptDeclarations().length.should.equal(2)

            //   // and vice-a-versa
            //   const baseAsset = modelManager.getType('org.acme.base.BaseAsset')
            //   baseAsset.should.not.be.null
            //   baseAsset.isAbstract().should.be.false
        });
    });
});
