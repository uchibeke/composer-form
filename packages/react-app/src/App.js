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
// const FormGenerator = require('composer-form');
import {FormGenerator} from 'composer-form'
import {Tabs, Tab} from 'react-bootstrap-tabs'


const options = {
    customClasses : {
        field: 'form-group',
        input: 'form-control',
        label: 'control-label'
    }

};




class App extends Component {
  state = {
    form: null,
    fileClasses: [],
    selectedClass: ''
  }

  componentDidMount () {
  }

  async form (file, options, type) {
    console.log("here")
    let form;
    if  (type === 'text') {
      form = await FormGenerator.fromText(file, options);
    } else if (type === 'url') {
      form = await FormGenerator.fromUrl(file, options);
    }
    this.setState({
      form
    })
  }

  async handleTextAreaSubmit(event) {
    this.form(this.state.modelFile, options, 'text')
    event.preventDefault();
  }
  
  handleTextAreaChange(event) {
    this.setState({modelFile: event.target.value});
  }

  async handleUrlSubmit(event) {
    this.form(this.state.modelUrl, options, 'url')
    event.preventDefault();
  }
  
  handleUrlChange(event) {
    this.setState({modelUrl: event.target.value});
  }

  get submitBtn () {
    const {customClasses} = options
    return (
      <input 
        type="submit" 
        value="Process" 
        className={customClasses.button || 'btn btn-primary'}/>)
  }

  async modelFIleClasses (file, options, type) {
    console.log("here")
    let fileClasses;
    if  (type === 'text') {
      fileClasses = await FormGenerator.getClasses(file, options);
    } else if (type === 'url') {
      fileClasses = await FormGenerator.getClasses(file, options);
    }
    this.setState({
      fileClasses
    })
  }

  async handleTextAreaModelProcess(event) {
    this.modelFIleClasses(this.state.modelFile, options, 'text')
    event.preventDefault();
  }


  render() {
    const {form, fileClasses} = this.state

    return (
      <div className="App container">
        <div className="row">
          <div className="col">
          <br></br>
              <Tabs
                headerStyle={{background:'#efefef'}}
                activeHeaderStyle={{background: 'white', 'border-top':'2px solid blue'}}
                selected={0}
              >
                <Tab  
                  label="Paste model file"
                >
                  <br></br>
                  <form onSubmit={this.handleTextAreaModelProcess.bind(this)}>
                    <div className="form-group">
                      <textarea 
                        value={this.state.modelFile} 
                        onChange={this.handleTextAreaChange.bind(this)}
                        className={'form-control Text-area'}
                        placeholder="Paste a model file"/>
                      <br></br>
                      {this.submitBtn}
                    </div>
                  </form>
                </Tab>
                <Tab
                  label="Enter the url for .cto file"
                >
                  <br></br>
                  <form onSubmit={this.handleUrlSubmit.bind(this)}>
                    <div className="form-group">
                      <input 
                        value={this.state.modelUrl} 
                        onChange={this.handleUrlChange.bind(this)}
                        className={'form-control'}
                        placeholder="https://"/>
                      <br></br>
                      {this.submitBtn}
                    </div>
                  </form>
                </Tab>
                <Tab
                  label="Upload model file"
                  disabled
                >
                  Currently disabled
                </Tab>
              </Tabs>
              <hr></hr>
              <div >
                Select Class to generate.

                {fileClasses.map((fileClass, index) =>
                  <p>
                    <strong>{fileClass} </strong> 
                    <button className="btn btn-primary btn-xs">Generate form</button>
                    
                  </p>
                )}
              </div>
              <hr></hr>
              <h2>Form</h2>
              <div dangerouslySetInnerHTML={{ __html: form }}> 
              </div>
            </div>
        </div>
      </div>
    );
  }
}


export default App
