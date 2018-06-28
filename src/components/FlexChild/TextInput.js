import React from 'react'

import './TextInput.css'

const textInput = props => {
  const hasValue = props.inputValue !== '' && props.inputValue !== undefined
  const isActiveClass = hasValue ? 'hasText' : ''

  const isInvalid = !props.valid && hasValue ? 'invalid-field' : ''
  
  const input =
    props.inputType === 'textarea' ? (
      <textarea
        className={isActiveClass + ' ' + isInvalid}
        name={props.inputName}
        onChange={props.hasText}
        type={props.inputType}
        value={props.inputValue}
      />
    ) : (
      <input
        className={isActiveClass + ' ' + isInvalid}
        name={props.inputName}
        type={props.inputType}
        onChange={props.hasText}
        defaultValue={props.inputValue}
      />
    )
  return (
    <div className={`flex-${props.width} flex-child`}>
      {input}
      <label>{props.label}</label>
    </div>
  )
}

export default textInput
