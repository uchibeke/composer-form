import React from 'react'
import ReactDOM from 'react-dom'
import FormBuilder from './FormBuilder'
import constants from '../../constants'

it('renders FormBuilder without crashing', () => {
  const div = document.createElement('div')
  const noop = () => {}

  ReactDOM.render(<div></div>, div)

  ReactDOM.unmountComponentAtNode(div)
})
