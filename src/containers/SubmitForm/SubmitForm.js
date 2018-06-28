import React from 'react'

import './SubmitForm.css'
import Header from '../../components/Header/Header'

const SubmitForm = props => {
  const handlePrint = e => {
    e.preventDefault()
    window.print()
  }
  const displayList = [
    { title: 'Fullname :', value: props.data.name },
    { title: 'Email :', value: props.data.email },
    { title: 'Phone :', value: props.data.phone },
    {
      title: 'Address :',
      value: props.data.address ? (
        <React.Fragment>
          {props.data.address}
          <br />
          {props.data.city}
          {props.data.zip ? `-${props.data.zip}` : ''}
          <br />
          {props.data.state ? `${props.data.state},` : ''} {props.data.country}
          <br />
        </React.Fragment>
      ) : (
        ''
      )
    },
    { title: 'How did you hear about us?', value: props.data.about },
    {
      title: 'Your primary design discipline :',
      value: props.data.disciplineSelect
    },
    {
      title: 'Experience with any other disciplines :',
      value: [...props.data.expSelect]
    },
    {
      title: 'Interested in working location(s) :',
      value: [...props.data.locationsSelect].join('; ')
    },
    { title: 'Portfolio link :', value: props.data.portfoLink },
    { title: 'Additional information :', value: props.data.etc }
  ]
  const renderList = displayList.map(el => {
    return el.value.length !== 0 ? (
      <React.Fragment key={el.value}>
        <p className="displayTitle">{el.title}</p>
        <p className="displayContent">{el.value}</p>
      </React.Fragment>
    ) : (
      ''
    )
  })
  return (
    <div>
      <Header>Review form</Header>
      {renderList}
      <button className="submit-button" onClick={e => handlePrint(e)}>
        Print
      </button>
    </div>
  )
}
export default SubmitForm
