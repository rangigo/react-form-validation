import React, { Component } from 'react'

import './Portfolio.css'

import Header from '../../components/Header/Header'
import TextInput from '../../components/FlexChild/TextInput'
import checkValidity from '../../shared/checkValidity'

export class Portfolio extends Component {
  state = {
    portfoLink: '',
    etc: '',
    valid: false,
    validation: {
      required: true,
      regex: /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
    },
    form: {}
  }

  componentDidMount() {
    this.setState({
      form: this.props.form,
      portfoLink: this.props.form.portfoLink,
      valid: checkValidity(this.props.form.portfoLink, this.state.validation),
      etc: this.props.form.etc
    })
  }

  storeDataOnApp = () => {
    const data = {
      portfoLink: this.state.portfoLink,
      etc: this.state.etc
    }
    this.props.storePortfolio(data,this.state.valid)
  }

  componentWillUnmount() {
    this.storeDataOnApp()
  }

  handleChange = e => {
    this.setState({
      portfoLink: e.target.value,
      valid: checkValidity(e.target.value, this.state.validation)
    })
  }

  handleSubmit = () => {
    this.storeDataOnApp()
    this.props.history.push('/submit-form')
  }

  render() {
    return (
      <div className="portfolio">
        <Header>3. Portfolio</Header>
        <div className="flex-box">
          <span>
            Prove you're our next great designer by showing us who you are. What
            you've done. How you think. Tell us your story
          </span>
          <TextInput
            width="100"
            inputType="text"
            inputName="portfolio-link"
            label="Portfolio link*"
            inputValue={this.state.portfoLink}
            hasText={this.handleChange}
            valid={this.state.valid}
          />
          <div className="flex-100 etc">
            <textarea
              rows="8"
              name="etc"
              placeholder="Anything else (another link, availability, etc.)?"
              value={this.state.etc}
              onChange={e => this.setState({ etc: e.target.value })}
              style={{
                padding: '8px',
                fontSize: '1.2em'
              }}
            />
          </div>
          <button className="submit-button" onClick={this.handleSubmit} disabled={!this.state.valid}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}

export default Portfolio
