import React from 'react';
import { FormErrors } from './FormErrors';

// All in percentages
const HUM_MAX = 95
const HUM_MIN = 50
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
    console.log('Form value: ' + this.state.highHum);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Set humidity</h2>
        <div className="panel panel-default">
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
        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Submit</button>
    </form>
    )
  }
}

export default HumidityForm