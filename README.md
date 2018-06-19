# Hyperledger Composer Modelling Tools

[![Coverage Status](https://coveralls.io/repos/github/uchibeke/composer-form/badge.svg?branch=master)](https://coveralls.io/github/uchibeke/composer-form?branch=master)

[![Build Status](https://travis-ci.com/uchibeke/composer-form.svg?branch=master)](https://travis-ci.com/uchibeke/composer-form)

The Hyperledger Composer modelling language is used by both Hyperledger Composer and Accord Project Cicero as an object-oriented data description (schema) language, based on a textual domain-specific language. Both communities would benefit from improved tooling for the modelling language, including the ability to generate UML style diagrams and web-forms from class descriptions described using the Hyperledger Composer modelling language.

## Two parts

### Class Diagram Viewer or Editor

The class diagram editor could use a UML-like syntax and a suitable web framework, such as Angular2 or React, for model, view, controller logic.A more advanced editor could synchronise with the text of the Hyperledger Composer model itself — allowing the user to either edit graphically, or using the text syntax.The project can be broken down into the following milestones:1) Web viewer; 2) Web editor; and 3) Synchronise web editor with DSL text.The viewer/editor should be created as an embeddable, modular, component so it can be easily embedded in web-based tools, such as Hyperledger Composer Playground, or similar.

### Web Form Generator

A web-form generated from model types would allow transactions to be submitted (or assets/participants created) by filling out a web-form, as opposed to submitting JSON formatted text, easing ease of use and guiding the user.The web form generator should be created to dynamically create form elements based on a root type from a Hyperledger Composer model. Some simplifying assumptions may need to be made to solve the issue of data-binding from arbitrarily complex object models to web forms.The web form generator should be an embeddable, modular, component so it can be easily embedded in web-based tools, such as Hyperledger Composer Playground, or similar.

### More Information

Modeling Language | Hyperledger Composer: https://hyperledger.github.io/composer/reference/cto_language.html
GitHub - accordproject/cicero: Open Source implementation of Accord Protocol Template Specification: https://github.com/accordproject/cicero
Hyperledger Composer: https://composer-playground.mybluemix.net

## Learning Objectives

- Understand the Hyperledger Composer modelling language, and its meta-model
- Investigate how best to bind models to web form elements such as: sliders, dropdowns, combo-boxes, text areas
- Investigate how best to data-bind relationships, arrays and nested complex types
- Investigate how client-side data validation can be used to enforce REGEX and domain validation constraints
- Data description languages in general (relationships, inheritance, containment, namespaces, imports etc)
- Graphical visualisation techniques for class diagrams and entity-relationship diagrams
- Model-View-Controller architecture for graphical editors
- Synchronise model and text
- React/Angular2 component development
- Displaying consistency errors

## Expected Outcome

- **Web-form Generator:** A functional dynamic web component, that generates a web-form based on the fully-qualified name of a type from a Hyperledger Composer Model. A sample web application that shows the dynamic web component in action.

- **Class Diagram Editor:** A functional web viewer, editor, or synchronised editor for CTO files, that can be easily embedded in a web application.

## Mentor(s)

Dan Selman
