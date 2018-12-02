import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { setSelectedStar, resetSelectedStar } from '../../../actions/common'
import { createProject } from '../../../actions/projects'

import '../../../../stylesheets/form_balloon.scss'

class ProjectForm extends Component {
  renderField({ placeholder, type, input, value, meta: { touched, error } }) {
    const fieldClasses = classNames({
      'form-group': true,
      'has-danger': touched && error,
      'assignment-fieled-style': true,
      'assignment-fieled-text': true,
      planet_type: placeholder === 'planet type',
    })

    const inInputClasses = classNames({
      'text-style': true,
      description: placeholder === 'description',
      deadline: placeholder === 'deadline',
    })

    return (
      <div className={fieldClasses}>
        <input
          className={inInputClasses}
          placeholder={placeholder}
          type={type}
          value={value}
          {...input}
        />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    )
  }

  onSubmit({ title }) {
    const target = document.getElementById('form-balloon')
    const target_star = document.getElementsByClassName('current-clicked')[0]
    const fixed_star_type = this.props.selectedStar

    this.props.createProject(title, fixed_star_type)
    this.props.resetSelectedStar()
    target_star.classList.remove('current-clicked')
    target.style.display = 'none'
  }

  render() {
    return (
      <div id="form-balloon">
        <div className="form-balloon-title">New Project</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <div className="form-line-2">
            <Field
              placeholder="title"
              name="title"
              type="text"
              component={this.renderField}
            />
          </div>
          <div className="form-line-4">
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
    { createProject, setSelectedStar, resetSelectedStar }
  )(ProjectForm)
)
