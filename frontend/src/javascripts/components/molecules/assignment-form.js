import React, { Component } from 'react'
import { Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux'

import { setSelectedPlanet, resetSelectedPlanet } from '../../actions/common'
import { createAssignment } from '../../actions/assignments'

class AssignmentForm extends Component {
  constructor(props) {
    super(props)
  }

  renderField({ placeholder, type, input, meta: { touched, error } }) {
    const classNames = `form-group ${touched && error ? 'has-danger' : ''} field-style fieled-text`
    return(
      <div className={classNames}>
        <input
          className="text-style"
          placeholder={placeholder}
          type={type}
          {...input} />
        <div className="text-help">
          {touched ? error: ''}
        </div>
      </div>
    )
  }

  onSubmit({ title, description, deadline, planet_type, planet_size, orbit_pos, projectId }) {
    this.props.createAssignment(title, detail, deadline, planet_type, planet_size, orbit_pos, projectId)
  }

  render(){
    return(
      <div className="detail-balloon">
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <Field placeholder="Target Orbit" name="orbit_pos" type="number" component={this.renderField} />
          <Field placeholder="Assignment title" name="title" type="text" component={this.renderField} />
          <Field placeholder="Assignment　deadline" name="deadline" type="date" component={this.renderField} />
          <Field placeholder="Assignment description" name="description" type="text" component={this.renderField} />
          <Field placeholder="Planet type" name="planet_type" type="text" component={this.renderField} />
          <Field placeholder="Planet size" name="planet_size" type="number" component={this.renderField} />
          <button type="submit" className="submit-btn">決定</button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = "Title required"
  } else if(values.email.length > 50) {
    errors.title = "Too long title"
  }

  if (!values.description) {
    errors.description = "Description required"
  } else if (values.description.length > 140) {
    errors.description = "Too long description"
  }
  return errors
}

export default reduxForm({
  validate,
  form: 'AssignmentForm'
})(connect(({selectedPlanet}) => {(selectedPlanet)}, { createAssignment, setSelectedPlanet, resetSelectedPlanet })(AssignmentForm))
