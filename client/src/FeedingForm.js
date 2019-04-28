import React from 'react';
import { FormErrors } from './FormErrors';

const MIN_CRICKETS_PER_FEED = 1
const MAX_CRICKETS_PER_FEED = 20

class FeedingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cricketsPerFeed: '',
      formErrors: {
        cricketsPerFeed: '',
      },
      cricketsPerFeedValid: false,
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
    let cricketsPerFeedValid = this.state.cricketsPerFeedValid
    let errorMessage = ' is invalid: '
    let markedInvalid = false

    if (isNaN(value)) {
      markedInvalid = true
      errorMessage += ' Must be a valid number.'
    }
    if (!Number.isInteger(Number(value))) {
      markedInvalid = true
      errorMessage += ' Must be an integer.'
    }
    if (value < MIN_CRICKETS_PER_FEED || value > MAX_CRICKETS_PER_FEED) {
      markedInvalid = true
      errorMessage += ' Must be between ' + MIN_CRICKETS_PER_FEED + ' and ' + MAX_CRICKETS_PER_FEED + ', inclusive.'
    }

    fieldValidationErrors.cricketsPerFeed = markedInvalid ? errorMessage : ''
    cricketsPerFeedValid = !markedInvalid

    this.setState({
        formErrors: fieldValidationErrors,
        cricketsPerFeedValid: cricketsPerFeedValid
      }, this.validateForm
    )
  }

  validateForm() {
    this.setState({
      formValid: this.state.cricketsPerFeedValid
    })
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error')
  }

  handleSubmit (event) {
    console.log('Form value: ' + this.state.cricketsPerFeed);
    event.preventDefault();
  }

  render() {
    return (
      <>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <h2>Feeding options</h2>
          <div className={this.errorClass(this.state.formErrors.cricketsPerFeed)}>
            <label htmlFor="cricketsPerFeed">Crickets per feed</label>
            <input
              type="number"
              required
              className="form-control"
              name="cricketsPerFeed"
              placeholder=""
              value={this.state.cricketsPerFeed}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Submit</button>
        </form>
      </>
    )
  }
}

export default FeedingForm