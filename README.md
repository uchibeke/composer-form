![Hyperledger Composer Form](https://raw.githubusercontent.com/hyperledger/composer/master/packages/composer-website/jekylldocs/assets/img/Homepage_Illustration_2.png)

# Hyperledger Composer Form

Hyperledger Composer Form is a form generator for Hyperledger composer.

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

For additional help with Hyperledger Composer the following are good places:

- Ask a question on [Stack Overflow](http://stackoverflow.com/questions/tagged/hyperledger-composer)
- Chat on the Rocket.Chat [discussion channels](https://chat.hyperledger.org/channel/composer)

# Contributing to Hyperledger Composer

We welcome contributions to the code base. If you are interested in becoming a contributor, please read the [contributing guide](CONTRIBUTING.md) that covers the following:

- [getting started](/contrib-notes/getting-started.md)
- [coding guidelines](/contrib-notes/coding-guidelines.md)
- [raising an issue](/contrib-notes/raising-issues.md)
- [submitting a pull request](/contrib-notes/submitting-pull-request.md)

There is a [specific channel](https://chat.hyperledger.org/channel/composer-dev) on RocketChat for contributors.

# Getting started with building an application with Hyperledger Composer

**Try the [online playground](https://composer-playground.mybluemix.net/) to get going quickly.**

Suggested reading list is:

- [Introduction](https://hyperledger.github.io/composer/latest/introduction/introduction.html)
- [Introduction Video](https://www.youtube.com/watch?v=fdFUsrsv5iw&t=23s)
- [Quick Start](https://hyperledger.github.io/composer/latest/installing/installing-index.html)
- [Tutorials](https://hyperledger.github.io/composer/latest/tutorials/tutorials.html)

# Getting in touch

If you have a *question on using Hyperledger Composer*
  - Rocket.Chat [discussion channels](https://chat.hyperledger.org/channel/composer)
  - [Stack Overflow](http://stackoverflow.com/questions/tagged/hyperledger-composer), where the question should be tagged with 'hyperledger-composer'.

If you have found a defect or want to raise a feature requests
  - All tracked on GitHub - please read [how to raise](./contrib-notes/raising-issues.md)

If you want to contribute to the develop of Hyperledger Composer
  - Come introduce yourself on the contributors [RocketChat channel](https://chat.hyperledger.org/channel/composer-dev)
  - Please read the [contributing guide](./CONTRIBUTING.md)

## License <a name="license"></a>
Hyperledger Project source code files are made available under the Apache License, Version 2.0 (Apache-2.0), located in the LICENSE file. Hyperledger Project documentation files are made available under the Creative Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.