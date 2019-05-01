import React from 'react';

import Col from 'react-bootstrap/Col'

import AuthService from './AuthService'
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
            crickets_to_feed: this.state.cricketsPerFeed,
          }
        }),
      }
    )
      .then(this.checkStatus)
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
          <h3>Feeding options</h3>
          <div className="panel panel-default message">
            <b>{this.state.message}</b>
          </div>
        </Col>
        <div className="panel panel-default reading-text reading-smaller">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
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
        <button type="submit" className="windows-button top-margin" disabled={!this.state.formValid}>Submit</button>
      </form>
    )
  }
}

export default FeedingForm