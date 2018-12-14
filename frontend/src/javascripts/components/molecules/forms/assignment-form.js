import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import InputField from '../../atoms/input-field'
import SelectField from '../../atoms/select-field'

import {
  setSelectedStar,
  resetSelectedStar,
  resetModalStatus,
} from '../../../actions/common'
import { createAssignment } from '../../../actions/assignments'

class AssignmentForm extends Component {
  onSubmit({ title, description, deadline, planet_size }) {
    const planet_type = this.props.selectedStar
    const project_id = this.props.currentProject.id
    const orbit_pos = this.props.orbit

    this.props.createAssignment(
      title,
      description,
      deadline,
      planet_type,
      planet_size,
      orbit_pos,
      project_id
    )
    this.props.resetSelectedStar()
    this.props.resetModalStatus()
  }

  render() {
    return (
      <div id="form-on-modal">
        <div className="form-title">New Assignment</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <div className="form-line-1">
            <Field
              placeholder="title"
              name="title"
              type="text"
              component={InputField}
            />
            <Field
              placeholder="deadline"
              name="deadline"
              type="date"
              component={InputField}
            />
          </div>
          <div className="form-line-2">
            <Field
              placeholder="description"
              name="description"
              type="textarea"
              component={InputField}
            />
          </div>
          <div className="form-line-3">
            <Field name="planet_size" type="select" component={SelectField} />
            <button type="submit" className="form-btn">
              決定
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  //TODO: 現状validatが適当 → rails側と絡めて後々実装
  if (!values.orbit_pos) {
    errors.orbit_pos = 'Orbit Position required'
  }

  if (!values.title) {
    errors.title = 'Title required'
  } else if (values.title.length > 50) {
    errors.title = 'Too long title'
  }

  if (!values.deadline) {
    errors.deadline = 'deadline required'
  }

  if (!values.description) {
    errors.description = 'Description required'
  } else if (values.description.length > 140) {
    errors.description = 'Too long description'
  }
  if (!values.planet_size) {
    errors.planet_size = 'Orbit Position required'
  }

  return errors
}

export default reduxForm({
  validate,
  form: 'AssignmentForm',
})(
  connect(
    ({ selectedStar, currentProject }) => ({ selectedStar, currentProject }),
    { createAssignment, setSelectedStar, resetSelectedStar, resetModalStatus }
  )(AssignmentForm)
)
