import React from 'react';

import Col from 'react-bootstrap/Col'

import AuthService from './AuthService'
import { FormErrors } from './FormErrors';

// All in percentages
const HUM_MAX = 95
const HUM_MIN = 20
const MIN_HUM_RANGE = 10

class HumidityForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      highHum: '',
      lowHum: '',
      formErrors: {
        highHum: '',
        lowHum: '',
        bothHum: '',
      },
      highHumValid: false,
      lowHumValid: false,
      bothHumsValid: false,
      formValid: false,
      message: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState(
      {[name]: value},
      () => { this.validateField(name, value) }
    )
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors
    let highHumValid = this.state.highHumValid
    let lowHumValid = this.state.lowHumValid
    let errorMessage = ' is invalid: '
    let markedInvalid = false
    
    if (isNaN(value)) {
      markedInvalid = true
      errorMessage += ' Must be a valid number.'
    }
    if (!(value >= HUM_MIN && value <= HUM_MAX)) {
      markedInvalid = true
      errorMessage += ' Must be between ' + HUM_MIN + ' and ' + HUM_MAX + ', inclusive.'
    }

    switch(fieldName) {
      case 'highHum':
        fieldValidationErrors.highHumValid = markedInvalid ? errorMessage : ''
        highHumValid = !markedInvalid
        break
      case 'lowHum':
        fieldValidationErrors.lowHumValid = markedInvalid ? errorMessage : ''
        lowHumValid = !markedInvalid
        break
      default:
        break
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        highHumValid: highHumValid,
        lowHumValid: lowHumValid,
      },
      this.validateBothFields
    )
  }

  validateBothFields() {
    let fieldValidationErrors = this.state.formErrors
    let bothHumsValid = this.state.bothHumsValid
    let markedInvalid = false
    let errorMessage = ' are invalid: '

    if (Math.abs(this.state.highHum - this.state.lowHum) < MIN_HUM_RANGE) {
      markedInvalid = true
      errorMessage += ' There must be at least 10 percent difference between the high and low hums.'
    }
    if ((this.state.highHum - this.state.lowHum) <= 0) {
      markedInvalid = true
      errorMessage += ' The low humidity must be less than the high humidity.'
    }

    bothHumsValid = !markedInvalid
    fieldValidationErrors.bothHumsValid = markedInvalid ? errorMessage : ''
    
    this.setState({
        formErrors: fieldValidationErrors,
        bothHumsValid: bothHumsValid,
      }, this.validateForm
    )
  }
  
  validateForm() {
    this.setState({
      formValid: this.state.highHumValid && this.state.lowHumValid && this.state.bothHumsValid
    })
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error')
  }

  handleSubmit (event) {
    event.preventDefault();

    let auth = new AuthService()
    let url = `${auth.domain}/app/settings`

    return fetch(
      url, 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.getToken()
        },
        body: JSON.stringify({
          config: {
            high_humidity: this.state.highHum,
            low_humidity: this.state.lowHum,
          }
        }),
      }
    )
      .then(auth.checkStatus)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          message: "Submitted!"
        })
      })
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Col className="text-center">
            <h3>Set humidity</h3>
            <div className="panel panel-default message">
              <b>{this.state.message}</b>
            </div>
          </Col>
          <div className="panel panel-default reading-text reading-smaller">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
        <div className={'form-group ${this.errorClass(this.state.formErrors.highHum)}'}>
          <label htmlFor="highHum">High Humidity</label>
          <input
            type="number"
            required
            className="form-control"
            name="highHum"
            placeholder=""
            value={this.state.highHum}
            onChange={this.handleChange}
          />
        </div>
        <div className={'form-group ${this.errorClass(this.state.formErrors.lowHum)}'}>
        <label htmlFor="lowHum">Low humidity</label>
          <input
            type="number"
            className="form-control"
            name="lowHum"
            placeholder=""
            value={this.state.lowHum}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="windows-button" disabled={!this.state.formValid}>Submit</button>
    </form>
    )
  }
}

export default HumidityForm