import React, { Component } from 'react'
import './Skills.css'

import Header from '../../components/Header/Header'
import CheckBox from '../../components/FlexChild/CheckBox'

export class Skills extends Component {
  state = {
    disciplines: {
      designResearch: {
        type: 'radio',
        name: 'discipline',
        value: 'Design Research',
        width: '25'
      },
      visualDesign: {
        type: 'radio',
        name: 'discipline',
        value: 'Visual Design',
        width: '25'
      },
      uxDesign: {
        type: 'radio',
        name: 'discipline',
        value: 'UX Design',
        width: '25'
      },
      frontEndDev: {
        type: 'radio',
        name: 'discipline',
        value: 'Front-end Dev',
        width: '25'
      }
    },
    exps: [
      {
        type: 'checkbox',
        value: 'Visual Design',
        width: '100'
      },
      {
        type: 'checkbox',
        value: 'UX Design',
        width: '100'
      },
      {
        type: 'checkbox',
        value: 'Front-end Dev',
        width: '100'
      }
    ],
    locations: [
      {
        type: 'checkbox',
        value: 'Austin, Texas',
        width: '100'
      },
      {
        type: 'checkbox',
        value: 'New York, New York',
        width: '100'
      },
      {
        type: 'checkbox',
        value: 'Toronto, Canada',
        width: '100'
      },
      {
        type: 'checkbox',
        value: 'Shanghai, China',
        width: '100'
      },
      {
        type: 'checkbox',
        value: 'Dublin, Ireland',
        width: '100'
      },
      {
        type: 'checkbox',
        value: 'Hursley, United Kingdom',
        width: '100'
      },
      {
        type: 'checkbox',
        value: 'Boeblingen, Germany',
        width: '100'
      },
      {
        type: 'checkbox',
        value: 'Somewhere else',
        width: '100'
      }
    ],
    disciplineSelect: 'Design Research',
    expSelect: [],
    locationsSelect: []
  }

  componentDidMount() {
    if (Object.keys(this.props.form).length !== 0) {
      if (this.props.form.expSelect && this.props.form.locationsSelect.length) {
        this.setState({
          disciplineSelect: this.props.form.disciplineSelect,
          expSelect: this.props.form.expSelect,
          locationsSelect: this.props.form.locationsSelect
        })
      }
    }
  }

  disciplineChange = e => {
    this.setState({
      disciplineSelect: e.target.value
    })

    this.props.storeSkills(
      {
        disciplineSelect: e.target.value
      },
      this.state.locationsSelect.length > 0
    )
  }

  expChange = e => {
    const value = e.target.value
    const expSelect = e.target.checked
      ? [...this.state.expSelect, value]
      : this.state.expSelect.filter(el => el !== value)
    this.setState({
      expSelect: expSelect
    })

    this.props.storeSkills(
      {
        expSelect: expSelect
      },
      this.state.locationsSelect.length > 0
    )
  }

  locChange = e => {
    const value = e.target.value
    const locationsSelect = e.target.checked
      ? [...this.state.locationsSelect, value]
      : this.state.locationsSelect.filter(el => el !== value)

    this.setState({
      locationsSelect: locationsSelect
    })

    this.props.storeSkills(
      {
        locationsSelect: locationsSelect
      },
      locationsSelect.length > 0
    )
  }

  handleNext = e => {
    this.props.history.push('/portfolio')
  }

  render() {
    return (
      <section>
        <Header>2. Skills and location</Header>
        <div className="skills-grid-box">
          <div className="discipline">
            <span>Which is your primary discipline?*</span>
            <div className="flex-box">
              {Object.values(this.state.disciplines).map(el => (
                <CheckBox
                  key={el.value}
                  type={el.type}
                  name={el.name}
                  label={el.value}
                  value={el.value}
                  width={el.width}
                  checked={this.state.disciplineSelect === el.value}
                  onChange={this.disciplineChange}
                />
              ))}
            </div>
          </div>
          <div className="discipline-exp">
            <span>Do you have experience with any other disciplines?</span>
            <div className="flex-box">
              {this.state.exps.map(el => (
                <CheckBox
                  key={el.value}
                  type={el.type}
                  label={el.value}
                  value={el.value}
                  width={el.width}
                  checked={this.state.expSelect.includes(el.value)}
                  onChange={this.expChange}
                />
              ))}
            </div>
          </div>
          <div className="locations">
            <span>Where are you interested in working?*</span>
            <p>
              You must be legally authorized to work without visa sponsorship in
              the locations you choose
            </p>
            <div className="flex-box">
              {this.state.locations.map(el => (
                <CheckBox
                  key={el.value}
                  type={el.type}
                  label={el.value}
                  value={el.value}
                  width={el.width}
                  checked={this.state.locationsSelect.includes(el.value)}
                  onChange={this.locChange}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          className="submit-button"
          onClick={this.handleNext}
          disabled={this.state.locationsSelect.length <= 0}
        >
          Next
        </button>
      </section>
    )
  }
}

export default Skills
