import React from 'react';
import TimePicker from 'react-time-picker';

import Col from 'react-bootstrap/Col'

import AuthService from './AuthService'
import { FormErrors } from './FormErrors';

/*
https://www.npmjs.com/package/react-time-picker
*/

class LightForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lightOnTime: '',
      lightOfftime: '',
      formErrors: {
        lightOnTime: '',
        lightOfftime: '',
        bothTimes: '',
      },
      lightOnTimeValid: false,
      lightOffTimeValid: false,
      bothTimesValid: false,
      formValid: false,
      message: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onLightOnTimeChange = this.onLightOnTimeChange.bind(this)
    this.onLightOffTimeChange = this.onLightOffTimeChange.bind(this)
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
    console.log(value)
    let fieldValidationErrors = this.state.formErrors
    let lightOffTimeValid = this.state.lightOffTimeValid
    let lightOnTimeValid = this.state.lightOnTimeValid
    let errorMessage = ' is invalid: '
    let markedInvalid = false

    switch(fieldName) {
      case 'lightOnTime':
        fieldValidationErrors.lightOnTimeValid = markedInvalid ? errorMessage : ''
        lightOnTimeValid = !markedInvalid
        break
      case 'lightOffTime':
        fieldValidationErrors.lightOffTimeValid = markedInvalid ? errorMessage : ''
        lightOffTimeValid = !markedInvalid
        break
      default:
        break
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        lightOffTimeValid: lightOffTimeValid,
        lightOnTimeValid: lightOnTimeValid,
      },
      this.validateBothFields
    )
  }

  validateBothFields() {
    console.log("both fields validate")
    let fieldValidationErrors = this.state.formErrors
    let bothTimesValid = this.state.bothTimesValid
    let markedInvalid = false
    let errorMessage = ' are invalid: '

    let startTime = Date.parse('02/07/2001 ' + this.state.lightOnTime + ':00')
    let endTime = Date.parse('02/07/2001 ' + this.state.lightOffTime + ':00')

    console.log(startTime)
    console.log(endTime)
    console.log(startTime >= endTime)
    if (startTime >= endTime) {
      markedInvalid = true
      errorMessage += ' The start time must be earlier than the end time.'
    }

    bothTimesValid = !markedInvalid
    fieldValidationErrors.bothTimes = markedInvalid ? errorMessage : ''

    this.setState({
      formErrors: fieldValidationErrors,
      bothTimesValid: bothTimesValid,
    }, this.validateForm
    )
  }

  validateForm() {
    this.setState({
      formValid: this.state.lightOffTimeValid && this.state.lightOnTimeValid && this.state.bothTimesValid
    })
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error')
  }

  handleSubmit(event) {
    /*
    url: /light_schedule
    post
    expects:
    {light_on_time: x, light_off_time}
    must be epoch time
    light on button
    */
    event.preventDefault();

    let auth = new AuthService()
    let url = `${auth.domain}/light_schedule`

    let lights_on = new Date('02/07/2001 ' + this.state.lightOnTime + ':00 CDT')
    let lights_off = new Date('02/07/2001 ' + this.state.lightOffTime + ':00 CDT')

    console.log(lights_on)
    console.log(lights_off)
    console.log(lights_off.valueOf())

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
          light_on_time: lights_on.valueOf(),
          light_off_time: lights_off.valueOf(),
      })
      }
    )
      .then(auth.checkStatus)

  }

  onLightOnTimeChange(val) {
    this.setState(
      {'lightOnTime': val},
      () => { this.validateField('lightOnTime', val) }
    )
  }

  onLightOffTimeChange(val) {
    this.setState(
      {'lightOffTime': val},
      () => { this.validateField('lightOffTime', val) }
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Col className="text-center">
            <h3>Light schedule</h3>
            <div className="panel panel-default message">
              <b>{this.state.message}</b>
            </div>
          
          <div className="panel panel-default reading-text reading-smaller">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
        <div className="form-group">
          Light on time:

          <TimePicker
            onChange={this.onLightOnTimeChange}
            value={this.state.lightOnTime}
            disableClock={true}
            clearIcon={null}
          />
        </div>
        <div className="form-group">
          Light off time:
          
          <TimePicker
            onChange={this.onLightOffTimeChange}
            value={this.state.lightOffTime}
            disableClock={true}
            clearIcon={null}
          />
        </div>
        <button type="submit" className="windows-button top-margin" disabled={!this.state.formValid}>Submit</button>
        </Col>
      </form>
    )
  }
}

export default LightForm