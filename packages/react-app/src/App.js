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

import React, { Component } from 'react';
import './App.css';
// import constants from './constants';
const apiEndpoint = 'http://localhost:7777/api/form';
const customFormClass = {
  field: 'form-group',
  input: 'form-control',
  label: 'control-label'
}



class App extends Component {
  state = {
    form: null
  }

  componentDidMount () {
    // TODO: Replace with imported data from uploaded file or pasted model file content
    const file = "namespace org.accordproject.finance.bond import org.accordproject.organization.Organization from https://models.accordproject.org/organization.cto import org.accordproject.time.Duration from https://models.accordproject.org/time.cto import org.accordproject.money.CurrencyCode from https://models.accordproject.org/money.cto enum CouponType { o FIXED o FLOATING } concept PaymentFrequency { o Integer periodMultiplier o Duration period } /** * Definition of a Bond, based on the FpML schema: * http://www.fpml.org/spec/fpml-5-3-2-wd-2/html/reporting/schemaDocumentation/schemas/fpml-asset-5-3_xsd/elements/bond.html * */ concept Bond { o String[] instrumentId o String description optional o CurrencyCode currency optional o String[] exchangeId o String clearanceSystem optional o String definition optional o String seniority optional o CouponType couponType optional o Double couponRate optional o DateTime maturity o Double parValue o Double faceAmount o PaymentFrequency paymentFrequency o String dayCountFraction --> Organization issuer } asset BondAsset identified by ISINCode { o String ISINCode o Bond bond }";     
    this.getForm(file)
  }

  async getForm (file) {
    console.log("here")
    let body = {
      file,
      styles: customFormClass
    }
    // Call Api
    fetch(apiEndpoint, {
      method: 'POST',
      headers: new Headers({
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
        }),
      body:JSON.stringify(body)
    })
    .then((response) => response.text())
    .then((form) => {
      console.log(form)
      this.setState({
        form
      })
    })
    .catch((err) => {
      // Handle error
      console.log(err)
    });
  }
  handleSubmit(event) {
    this.getForm (this.state.modelFile) 
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({modelFile: event.target.value});
  }


  render() {
    const {form} = this.state

    return (
      <div className="App container">
        <div className="row">
          <div className="col">
              <link rel="stylesheet" 
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
                integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
                crossOrigin="anonymous">
              </link>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <label className={customFormClass.label || 'control-label'}> Paste model file: </label>
                  <textarea 
                    value={this.state.modelFile} 
                    onChange={this.handleChange.bind(this)}
                    className={customFormClass.input || 'form-control Text-area'}
                    placeholder="Does not yet work"/>
                  <br></br>
                  <input 
                    type="submit" 
                    value="Submit" 
                    className={customFormClass.button || 'btn btn-primary'}/>
                </div>
              </form>
              <hr></hr>
              <div dangerouslySetInnerHTML={{ __html: form }}> 
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App
