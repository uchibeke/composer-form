# React App Hyperledger Composer Modelling Tools 

[![Coverage Status](https://coveralls.io/repos/github/uchibeke/composer-form/badge.svg?branch=master)](https://coveralls.io/github/uchibeke/composer-form?branch=master)

[![Build Status](https://travis-ci.com/uchibeke/composer-form.svg?branch=master)](https://travis-ci.com/uchibeke/composer-form)

The Hyperledger Composer modelling language is used by both Hyperledger Composer and Accord Project Cicero as an object-oriented data description (schema) language, based on a textual domain-specific language. Both communities would benefit from improved tooling for the modelling language, including the ability to generate UML style diagrams and web-forms from class descriptions described using the Hyperledger Composer modelling language.

## Get started

Repository is made up of 3 packages in the `packages` directory. The `main` package does the actual form generation. The other packages are interfaces for displaying the generated form.

### Run the project

- Git clone this repo
- In root directory, run `lerna bootstrap`
- Start the react app by navigating to `packages/react-app` and run `yarn start`
