import React from 'react'

import './CheckBox.css'

const CheckBox = props => {
  let boxType
  let input
  let markBox

  if (props.type === 'radio') {
    boxType = 'radio-box'
    input = (
      <input
        type="radio"
        name={props.name}
        checked={props.checked}
        value={props.value}
        onChange={props.onChange}
      />
    )
    markBox = 'rad-checkmark'
  } else {
    boxType = 'check-box'
    input = (
      <input
        type="checkbox"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
      />
    )
    markBox = 'checkmark'
  }
  return (
    <div className={`flex-${props.width} ${boxType} flex-child`}>
      {input}
      {props.label}
      <span className={markBox} />
    </div>
  )
}

export default CheckBox
