import React from 'react';
import { FormErrors } from './FormErrors';

const TEMP_MIN = 20 // 68 F
const TEMP_MAX = 40 // 104 F
const MIN_TEMP_RANGE = 5 // range of 9 F

class TemperatureForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      highTemp: '',
      lowTemp: '',
      formErrors: {
        highTempValid: '',
        lowTempValid: '',
        bothTemps: '',
      },
      highTempValid: false,
      lowTempValid: false,
      bothTempsValid: false,
      formValid: false,
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
    let highTempValid = this.state.highTempValid
    let lowTempValid = this.state.lowTempValid
    let errorMessage = ' is invalid:';
    let markedInvalid = false

    if (isNaN(value)) {
      markedInvalid = true
      errorMessage += ' Must be a valid number.'
    }
    if (!(value >= TEMP_MIN && value <= TEMP_MAX)) {
      markedInvalid = true
      errorMessage += ' Must be between ' + TEMP_MIN + ' and ' + TEMP_MAX + ', inclusive.'
    }

    switch(fieldName) {
      case 'highTemp':
        fieldValidationErrors.highTempValid = markedInvalid ? errorMessage : ''
        highTempValid = !markedInvalid
        break
      case 'lowTemp':
        fieldValidationErrors.lowTempValid = markedInvalid ? errorMessage : ''
        lowTempValid = !markedInvalid
        break
      default:
        break
    }

    this.setState({
        formErrors: fieldValidationErrors,
        highTempValid: highTempValid,
        lowTempValid: lowTempValid,
      }, this.validateBothFields
    )
  }

  validateBothFields() {
    let fieldValidationErrors = this.state.formErrors
    let bothTempsValid = this.state.bothTempsValid
    let markedInvalid = false
    let errorMessage = ' are invalid: '

    if (Math.abs(this.state.highTemp - this.state.lowTemp) < MIN_TEMP_RANGE) {
      markedInvalid = true
      errorMessage += ' There must be at least 5 degrees difference between the high and low temperatures.'
    }
    if ((this.state.highTemp - this.state.lowTemp) <= 0) {
      markedInvalid = true
      errorMessage += ' The low temperature must be less than the high temperature.'
    }

    bothTempsValid = !markedInvalid
    fieldValidationErrors.bothTempsValid = markedInvalid ? errorMessage : ''

    this.setState({
        formErrors: fieldValidationErrors,
        bothTempsValid: bothTempsValid,
      }, this.validateForm
    )
  }

  validateForm() {
    this.setState({
      formValid: this.state.highTempValid && this.state.lowTempValid && this.state.bothTempsValid
    })
  }

  errorClass(error) {
    return(error.length === 0 ? 'form-group' : 'form-group has-error')
  }

  handleSubmit (event) {
    console.log('Form value: ' + this.state.highTemp);
    event.preventDefault();
  }

  render() {
    return (
      <>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <h2>Set temperature</h2>
          <div className={this.errorClass(this.state.formErrors.highTempValid)}>
            <label htmlFor="highTemp">High temperature</label>
            <input
              type="number"
              required
              className="form-control"
              name="highTemp"
              placeholder=""
              value={this.state.highTemp}
              onChange={this.handleChange}
            />
          </div>
          <div className={this.errorClass(this.state.formErrors.lowTempValid)}>
          <label htmlFor="lowTemp">Low temperature</label>
            <input
              type="number"
              className="form-control"
              name="lowTemp"
              placeholder=""
              value={this.state.lowTemp}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Submit</button>
      </form>
    </>
    )
  }
}

export default TemperatureForm;