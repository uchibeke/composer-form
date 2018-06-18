import React from 'react'
import ReactDOM from 'react-dom'
import FormBuilder from './FormBuilder'
import constants from '../../constants'

it('renders FormBuilder without crashing', () => {
  const div = document.createElement('div')
  const noop = () => {}

  ReactDOM.render(
    <FormBuilder className='form'
      title='Registration'
      defaultValues={[]}
      model={constants.model}
      onSubmit={noop}
    />, div)

  ReactDOM.unmountComponentAtNode(div)
})
