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
const express = require('express');
const app = express();
const port = process.env.PORT || 7777;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const Generator = require('../lib/formgenerator');

app.listen(port);
// eslint-disable-next-line
console.log('Server started! At http://localhost:' + port);

app.get('/', function(req, res) {
    res.redirect('/api/:version');
});

app.get('/api/:version', function(req, res) {
    res.send(req.params.version);
});

app.post('/api/form', async function(req, res) {
    const file = req.body.file;
    const styles = req.body.styles;
    const primitiveTypes = req.body.primitiveTypes;
    const FormGenerator = new Generator(file, primitiveTypes, styles);
    const form = await FormGenerator.form();

    res.send(String(form));
});