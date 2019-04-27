import React from 'react';
import { FormErrors } from './FormErrors';

// https://github.com/learnetto/react-form-validation-demo/blob/master/src/Form.js

class TemperatureForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      highTemp: '',
      lowTemp: '',
      formErrors: {
        highTemp: '',
        lowTemp: '',
      },
      highTempValid: false,
      lowTempValid: false,
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
    
    switch(fieldName) {
      case 'highTemp':
        if (value > 20 && value < 60) {
          highTempValid = true
        } else {
          highTempValid = false
        }
        fieldValidationErrors.highTempValid = highTempValid ? '' : ' is invalid'
        break
      case 'lowTemp':
        if (value > 20 && value < 60) {
          lowTempValid = true
        } else {
          lowTempValid = false
        }
        fieldValidationErrors.lowTempValid = lowTempValid ? '' : ' is invalid'
        break
      default:
        break
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        highTempValid: highTempValid,
        lowTempValid: lowTempValid,
      },
      this.validateForm
    )
  }

  validateForm() {
    this.setState({
      formValid: this.state.highTempValid && this.state.lowTempValid
    })
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error')
  }

  handleSubmit (event) {
    console.log('Form value: ' + this.state.highTemp);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Set temperature</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={'form-group ${this.errorClass(this.state.formErrors.highTemp)}'}>
          <label htmlFor="highTemp">High temp</label>
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
        <div className={'form-group ${this.errorClass(this.state.formErrors.lowTemp)}'}>
        <label htmlFor="password">Password</label>
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
    )
  }
}

export default TemperatureForm;