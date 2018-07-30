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

require('chai').should();

describe('formgenerator Tests', function () {
    describe('#validation', function () {
        it('accepts a model string as input', async function () {
            let file = `
            namespace org.accordproject.finance.bond import org.accordproject.organization.Organization from https://models.accordproject.org/organization.cto import org.accordproject.time.Duration from https://models.accordproject.org/time.cto import org.accordproject.money.CurrencyCode from https://models.accordproject.org/money.cto enum CouponType { o FIXED o FLOATING } concept PaymentFrequency { o Integer periodMultiplier o Duration period } /** * Definition of a Bond, based on the FpML schema: * http://www.fpml.org/spec/fpml-5-3-2-wd-2/html/reporting/schemaDocumentation/schemas/fpml-asset-5-3_xsd/elements/bond.html * */ concept Bond { o String[] instrumentId o String description optional o CurrencyCode currency optional o String[] exchangeId o String clearanceSystem optional o String definition optional o String seniority optional o CouponType couponType optional o Double couponRate optional o DateTime maturity o Double parValue o Double faceAmount o PaymentFrequency paymentFrequency o String dayCountFraction --> Organization issuer } asset BondAsset identified by ISINCode { o String ISINCode o Bond bond }
            `;
            const FormGenerator = new Generator(file);
            FormGenerator.should.not.be.null;
        });
    });
    describe('#instantiate', function () {
        it('generates a form from text', async function () {
            let text = `
            namespace org.accordproject.finance.bond import org.accordproject.organization.Organization from https://models.accordproject.org/organization.cto import org.accordproject.time.Duration from https://models.accordproject.org/time.cto import org.accordproject.money.CurrencyCode from https://models.accordproject.org/money.cto enum CouponType { o FIXED o FLOATING } concept PaymentFrequency { o Integer periodMultiplier o Duration period } /** * Definition of a Bond, based on the FpML schema: * http://www.fpml.org/spec/fpml-5-3-2-wd-2/html/reporting/schemaDocumentation/schemas/fpml-asset-5-3_xsd/elements/bond.html * */ concept Bond { o String[] instrumentId o String description optional o CurrencyCode currency optional o String[] exchangeId o String clearanceSystem optional o String definition optional o String seniority optional o CouponType couponType optional o Double couponRate optional o DateTime maturity o Double parValue o Double faceAmount o PaymentFrequency paymentFrequency o String dayCountFraction --> Organization issuer } asset BondAsset identified by ISINCode { o String ISINCode o Bond bond }
            `;
            const options = {
                customClasses : {
                    field: 'form-group',
                    input: 'form-control',
                    label: 'control-label'
                }
            };
            const FormGenerator = new Generator(text,options );
            FormGenerator.should.not.be.null;
            const form = await FormGenerator.generateHTML();
            form.should.contain('<form');
        });
    });
    describe('#fromFile', function () {
        it('generates a form from passed localfile', async function () {
            const localFile = './test/samples/models/bond.cto';
            const options = {
                customClasses : {
                    field: 'form-group',
                    input: 'form-control',
                    label: 'control-label'
                }
            };
            const form = await Generator.fromFile(localFile, options);
            form.toString().should.contain('class="form-control"');
        });
    });
    describe('#fromUrl', function () {
        it('generates a form with custom classes passed by user', async function () {
            const url = 'https://raw.githubusercontent.com/accordproject/models/master/src/finance/bond.cto';
            const options = {
                customClasses : {
                    field: 'form-group',
                    input: 'form-control',
                    label: 'control-label'
                }

            };
            const form = await Generator.fromUrl(url, options);
            form.toString().should.contain('class="form-control"');
        });
    });
});
