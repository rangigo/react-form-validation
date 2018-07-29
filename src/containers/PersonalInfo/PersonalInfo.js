import React, { Component } from 'react'

import './PersonalInfo.css'

import Header from '../../components/Header/Header'
import TextInput from '../../components/FlexChild/TextInput'

import checkValidity from '../../shared/checkValidity'

export class PersonalInfo extends Component {
  state = {
    inputs: {
      name: {
        width: '75',
        inputName: 'name',
        inputType: 'text',
        label: 'Full name*',
        validation: {
          required: true,
          regex: /^[a-zA-Z ]{1,}$/
        },
        valid: false
      },
      phone: {
        width: '25',
        inputName: 'phone',
        inputType: 'text',
        label: 'Phone*',
        validation: {
          regex: /^(0[0-9]{9})$|(\+358{1}[0-9]{9})$|(00358[0-9]{9})$/,
          required: true
        },
        valid: false
      },
      email: {
        width: '75',
        inputName: 'email',
        inputType: 'email',
        label: 'Email*',
        validation: {
          required: true
        },
        valid: false
      },
      reEmail: {
        width: '75',
        inputName: 'reEmail',
        inputType: 'email',
        label: 'Re-enter email*',
        validation: {
          required: true
        },
        valid: false
      },
      address: {
        width: '100',
        inputName: 'address',
        inputType: 'textarea',
        label: 'Address*',
        validation: {
          required: true
        },
        valid: false
      },
      city: {
        width: '25',
        inputName: 'city',
        inputType: 'text',
        label: 'City*',
        validation: {
          regex: /^[a-zA-Z1-9 ,]{1,}$/,
          required: true
        },
        valid: false
      },
      state: {
        width: '25',
        inputName: 'state',
        inputType: 'text',
        label: 'State',
        validation: {
          regex: /^[a-zA-Z1-9 ,]*$/
        },
        valid: true
      },
      country: {
        width: '25',
        inputName: 'country',
        inputType: 'text',
        label: 'Country/Region*',
        validation: {
          required: true,
          regex: /^[a-zA-Z1-9 ,]{1,}$/
        },
        valid: false
      },
      zip: {
        width: '25',
        inputName: 'zip',
        inputType: 'text',
        label: 'Zip/Postal Code',
        validation: {
          regex: /^$|[0-9]{5}$/
        },
        valid: true
      },
      about: {
        width: '100',
        inputName: 'about',
        inputType: 'text',
        label: 'How did you hear about us',
        validation: {
          regex: /^[a-zA-Z1-9 ,]*$/
        },
        valid: true
      }
    },
    form: {},
    formIsValid: false
  }

  componentDidMount() {
    if (Object.keys(this.props.form).length !== 0) {
      this.setState({
        form: this.props.form,
        formIsValid: this.props.infoValid
      })

      for (const key in this.props.form) {
        if (
          key !== 'expSelect' &&
          key !== 'locationsSelect' &&
          key !== 'disciplineSelect' &&
          key !== 'etc' &&
          key !== 'portfoLink'
        )
          this.setState(prevState => ({
            inputs: {
              ...prevState.inputs,
              [key]: {
                ...prevState.inputs[key],
                valid: checkValidity(
                  this.props.form[key],
                  this.state.inputs[key].validation
                )
              }
            }
          }))
      }
    }
  }

  handleTextChange = e => {
    const inputName = e.target.name
    const inputValue = e.target.value

    const isValid =
      inputName === 'reEmail'
        ? inputValue === this.state.form.email &&
          checkValidity(inputValue, this.state.inputs[inputName].validation)
        : checkValidity(inputValue, this.state.inputs[inputName].validation)

    const updatedInputs = {
      ...this.state.inputs,
      [inputName]: {
        ...this.state.inputs[inputName],
        valid: isValid
      }
    }

    const updatedForm = {
      ...this.state.form,
      [inputName]: inputValue
    }

    let formIsValid = true
    for (const key in updatedInputs) {
      formIsValid = updatedInputs[key].valid && formIsValid
    }

    this.setState({
      inputs: updatedInputs,
      form: updatedForm,
      formIsValid: formIsValid
    })

    this.props.storeInfo(updatedForm, formIsValid)
  }

  handleNext = e => {
    e.preventDefault()
    this.props.history.push('/skills-location')
  }

  render() {
    return (
      <form>
        <Header>1. Personal information</Header>
        <div className="flex-box">
          {Object.values(this.state.inputs).map(el => (
            <TextInput
              key={el.inputName}
              width={el.width}
              inputType={el.inputType}
              inputName={el.inputName}
              label={el.label}
              hasText={this.handleTextChange}
              inputValue={this.state.form[el.inputName]}
              valid={el.valid}
            />
          ))}
        </div>
        <button
          className="submit-button"
          style={{ marginTop: '0' }}
          onClick={this.handleNext}
          disabled={!this.state.formIsValid}
        >
          Next
        </button>
      </form>
    )
  }
}

export default PersonalInfo
