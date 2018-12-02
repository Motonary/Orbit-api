import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { setSelectedStar, resetSelectedStar } from '../../../actions/common'
import { createAssignment } from '../../../actions/assignments'

import '../../../../stylesheets/form_balloon.scss'

class AssignmentForm extends Component {
  renderField({ placeholder, type, input, value, meta: { touched, error } }) {
    const fieldClasses = classNames({
      'form-group': true,
      'has-danger': touched && error,
      'assignment-fieled-style': true,
      'assignment-fieled-text': true,
      deadline: placeholder === 'deadline',
      planet_type: placeholder === 'planet type',
    })

    return (
      <div className={fieldClasses}>
        <input
          className={`text-style ${
            placeholder === 'description' ? 'description' : ''
          } ${placeholder === 'deadline' ? 'deadline' : ''}`}
          placeholder={placeholder}
          type={type}
          value={value}
          {...input}
        />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    )
  }

  onSubmit({ title, description, deadline, planet_size, orbit_pos }) {
    const target = document.getElementById('form-balloon')
    const planet_type = this.props.selectedStar
    const project_id = this.props.currentProject.id

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
    target.style.display = 'none'
  }

  render() {
    return (
      <div id="form-balloon">
        <div className="form-balloon-title">New Assignment</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <div className="form-line-1">
            <Field
              name="orbit_pos"
              component="select"
              className="assignment-select-fieled-style"
            >
              <option value="" className="assignment-fieled-text">
                Orbit
              </option>
              <option value="primo" className="assignment-fieled-text">
                1
              </option>
              <option value="secundus" className="assignment-fieled-text">
                2
              </option>
              <option value="tertius" className="assignment-fieled-text">
                3
              </option>
            </Field>
          </div>
          <div className="form-line-2">
            <Field
              placeholder="title"
              name="title"
              type="text"
              component={this.renderField}
            />
            <Field
              placeholder="deadline"
              name="deadline"
              type="date"
              component={this.renderField}
            />
          </div>
          <div className="form-line-3">
            <Field
              placeholder="description"
              name="description"
              type="textarea"
              component={this.renderField}
            />
          </div>
          <div className="form-line-4">
            <Field
              name="planet_size"
              component="select"
              className="assignment-select-fieled-style"
            >
              <option value="" className=" assignment-fieled-text">
                SIZE
              </option>
              <option value="large" className="assignment-fieled-text">
                large
              </option>
              <option value="medium" className="assignment-fieled-text">
                medium
              </option>
              <option value="small" className="assignment-fieled-text">
                small
              </option>
            </Field>
            <button type="submit" className="submit-btn assignment-fieled-text">
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
    { createAssignment, setSelectedStar, resetSelectedStar }
  )(AssignmentForm)
)
