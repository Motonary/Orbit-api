import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import Field from '../../atoms/field'

import {
  setSelectedStar,
  resetSelectedStar,
  resetModalStatus,
} from '../../../actions/common'
import { createAssignment } from '../../../actions/assignments'

class AssignmentForm extends Component {
  addSatelitePlanet() {
    const conditional_class1 = document.getElementsByClassName(
      'secundus-orbit-motion'
    )
    const conditional_class2 = document.getElementsByClassName(
      'tertius-orbit-motion'
    )
    const target_class = document.getElementsByClassName('planet-large-primo')
    const target_width = 1.5 * target_class[0].getBoundingClientRect().width

    if (
      conditional_class1[0].children[1].classList.contains('satelite-orbit')
    ) {
      conditional_class1[0].children[1].style.width = target_width + 'px'
      conditional_class1[0].children[1].style.height = target_width + 'px'
      conditional_class2[0].children[1].style.width = target_width + 'px'
      conditional_class2[0].children[1].style.height = target_width + 'px'
    }
  }

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
              component={this.renderField}
            />
            <Field
              placeholder="deadline"
              name="deadline"
              type="date"
              component={this.renderField}
            />
          </div>
          <div className="form-line-2">
            <Field
              placeholder="description"
              name="description"
              type="textarea"
              component={this.renderField}
            />
          </div>
          <div className="form-line-3">
            <select name="planet_size" className="select-fieled-style">
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
            </select>
            <button type="submit" className="form-btn assignment-fieled-text">
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
