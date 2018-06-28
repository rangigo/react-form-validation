import React from 'react'

import './Header.css'

const header = (props) => {
  return (
    <header className='header'>
      <h4>{props.children}</h4>
    </header>
  )
}

export default header
