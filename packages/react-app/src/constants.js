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

let constants = {}
constants.model = [
  {key: 'name', label: 'Name', props: {required: true}},
  {key: 'age', label: 'Age', type: 'number'},
  {key: 'rating', label: 'Rating', type: 'number', props: {min: 0, max: 5}},
  {key: 'gender',
    label: 'Gender',
    type: 'radio',
    options: [
      {key: 'male', label: 'Male', name: 'gender', value: 'male'},
      {key: 'female', label: 'Female', name: 'gender', value: 'female'}
    ]},
  {key: 'qualification', label: 'Qualification'},
  {key: 'city',
    label: 'City',
    type: 'select',
    value: 'Kerala',
    options: [
      {key: 'mumbai', label: 'Mumbai', value: 'Mumbai'},
      {key: 'bangalore', label: 'Bangalore', value: 'Bangalore'},
      {key: 'kerala', label: 'Kerala', value: 'Kerala'}
    ]},
  {key: 'skills',
    label: 'Skills',
    type: 'checkbox',
    options: [
      {key: 'reactjs', label: 'ReactJS', value: 'reactjs'},
      {key: 'angular', label: 'Angular', value: 'angular'},
      {key: 'vuejs', label: 'VueJS', value: 'vuejs'}
    ]}
]

export default constants
