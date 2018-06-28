import React, { Component } from 'react'
import { Switch, Route, NavLink, Redirect, withRouter } from 'react-router-dom'
import PersonalInfo from './containers/PersonalInfo/PersonalInfo'
import Skills from './containers/Skills/Skills'
import SubmitForm from './containers/SubmitForm/SubmitForm'

import './App.css'
import { Portfolio } from './containers/Portfolio/Portfolio'

class App extends Component {
  state = {
    form: {
      name: '',
      email: '',
      phone: '',
      city: '',
      address: '',
      state: '',
      zip: '',
      about: '',
      disciplineSelect: '',
      expSelect: [],
      locationsSelect: [],
      portfoLink: '',
      etc: ''
    },
    infoValid: false,
    skillsValid: false,
    portfolioValid: false
  }

  storeInfo = (formData, infoValid) => {
    this.setState({
      form: formData,
      infoValid: infoValid
    })
  }

  storeSkills = (formData, skillsValid) => {
    this.setState({
      form: {
        ...this.state.form,
        ...formData
      },
      skillsValid: skillsValid
    })
  }

  storePortfolio = (formData, portfolioValid) => {
    this.setState({
      form: {
        ...this.state.form,
        ...formData
      },
      portfolioValid: portfolioValid
    })
  }

  render() {
    const nav =
      this.props.location.pathname === '/submit-form' ? null : (
        <nav>
          <ul className="nav-bar">
            <li>
              <NavLink to="/personal-info" activeClassName="active">
                Information
              </NavLink>
            </li>
            <li className={this.state.infoValid ? '' : 'disabled'}>
              <NavLink to="/skills-location" activeClassName="active">
                Skills
              </NavLink>
            </li>
            <li
              className={
                this.state.skillsValid && this.state.infoValid ? '' : 'disabled'
              }
            >
              <NavLink to="/portfolio" activeClassName="active">
                Portfolio
              </NavLink>
            </li>
          </ul>
        </nav>
      )

    return (
      <div className="App">
        <header>
          <h1>Let's talk</h1>
          <span>Think you have what it takes? Show us</span>
          {nav}
        </header>
        <Switch>
          <Route
            path="/personal-info"
            render={props => (
              <PersonalInfo
                {...props}
                storeInfo={this.storeInfo}
                form={this.state.form}
                infoValid={this.state.infoValid}
              />
            )}
          />
          {this.state.infoValid ? (
            <Route
              path="/skills-location"
              render={props => (
                <Skills
                  {...props}
                  storeSkills={this.storeSkills}
                  form={this.state.form}
                />
              )}
            />
          ) : null}
          {this.state.infoValid && this.state.skillsValid ? (
            <Route
              path="/portfolio"
              render={props => (
                <Portfolio
                  {...props}
                  storePortfolio={this.storePortfolio}
                  form={this.state.form}
                />
              )}
            />
          ) : null}
          {this.state.infoValid &&
          this.state.skillsValid &&
          this.state.portfolioValid ? (
            <Route
              path="/submit-form"
              render={props => <SubmitForm {...props} data={this.state.form} />}
            />
          ) : null}
          <Redirect to="/personal-info" />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
