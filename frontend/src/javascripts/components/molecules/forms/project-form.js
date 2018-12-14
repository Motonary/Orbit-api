import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import InputField from '../../atoms/input-field'

import {
  setSelectedStar,
  resetSelectedStar,
  resetModalStatus,
} from '../../../actions/common'
import { createProject } from '../../../actions/projects'

import '../../../../stylesheets/form_on_modal.scss'

class ProjectForm extends Component {
  onSubmit({ title }) {
    const fixed_star_type = this.props.selectedStar

    this.props.createProject(title, fixed_star_type)
    this.props.resetSelectedStar()
    this.props.resetModalStatus()
  }

  render() {
    return (
      <div id="form-on-modal">
        <div className="form-balloon-title">New Project</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <div className="form-line-2">
            <Field
              placeholder="title"
              name="title"
              type="text"
              component={InputField}
            />
          </div>
          <div className="form-line-4">
            <button type="submit" className="submit-btn">
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
  if (!values.title) {
    errors.title = 'Title required'
  } else if (values.title.length > 50) {
    errors.title = 'Too long title'
  }

  return errors
}

export default reduxForm({
  validate,
  form: 'ProjectForm',
})(
  connect(
    ({ selectedStar }) => ({ selectedStar }),
    { createProject, setSelectedStar, resetSelectedStar, resetModalStatus }
  )(ProjectForm)
)
