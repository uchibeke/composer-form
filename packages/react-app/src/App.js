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
import constants from './constants';
import FormBuilder from './components/FormBuilder/FormBuilder';
var fileName = require('./samples/models/bond.cto');
const ComposerForm = require('composer-form');



class App extends Component {
  state = {
    data: [],
    current: {},
    modelFiles: null

  }

  onSubmit = (model) => {
    let data = [];
    if (model.id) {
      data = this.state.data.filter((d) => {
        return d.id != model.id
      });
    } else {
      model.id = +new Date();
      data = this.state.data.slice();
    }
    
    this.setState({
      data: [model, ...data]
    });
  }

  onEdit = (id) => {
    let record = this.state.data.find((d) => {
      return d.id == id;
    });
    alert(JSON.stringify(record));
    this.setState({
      current: record
    })
  }

  componentDidMount () {
    this.setupModels(fileName)
  }

  async setupModels (fileName) {
      // fetch(fileName)
      //     .then(response => {
      //       console.log(response)
      //       return response.text()
      //     })
      //     .then(text => {
      //       console.log(text)
      //       this.setState({
      //         modelFiles: text
      //       })

      //       let modelManager = new ModelManager()
      //       modelManager.addModelFile(text, undefined, true)
      //       modelManager.updateExternalModels();
      //       let modelFiles = modelManager.getModelFiles()
      //       console.log(modelFiles)
      //       this.setState({
      //         modelFiles: modelFiles
      //       })
      //     })

    const formGenerator = new ComposerForm.FormGenerator(fileName);
    const models = await formGenerator.form();
    this.setState({
      modelFiles: models
    })
  }

  render() {
    const {modelFiles} = this.state
    const data = this.state.data.map((d) => {
      return (
        <tr key={d.id}>
            <td>{d.name}</td>
            <td>{d.age}</td>
            <td>{d.qualification}</td>
            <td>{d.gender}</td>
            <td>{d.rating}</td>
            <td>{d.city}</td>
            <td>{d.skills.join(",")}</td>
            <td><button onClick={()=>{this.onEdit(d.id)}}>edit</button></td>
        </tr>
      );
    });
    // TODO: Replace with model imported after prompting user for CML and url 
    const model = constants.model

    
    return (
      <div className="App">
        <FormBuilder className="form"
          title = "Registration"
          defaultValues = {this.state.current}
          model={model}
          onSubmit = {(model) => {this.onSubmit(model)}} 
        />

        <table border="1">
          <tbody>{data}</tbody>
        </table>

      </div>
    );
  }
}

export default App
