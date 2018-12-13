import * as React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { connect } from 'react-redux'

import InputField from '../../atoms/input-field'
import SelectField from '../../atoms/select-field'

import {
  setSelectedStar,
  resetSelectedStar,
} from '../../../actions/common'
import { createAssignment } from '../../../actions/assignments'

interface FormFields {
  placeholder: any,
  type: any,
}

interface AssignmentFormProps extends InjectedFormProps {
  selectedStar: any,
  currentProject: any,

  setSelectedStar: any,
  resetSelectedStar: any,
  createAssignment: any,

  handleSubmit: any,
}

class AssignmentForm extends React.Component<AssignmentFormProps　& InjectedFormProps<{}, FormFields>> {

  onSubmit({ title, description, deadline, planet_size, orbit_pos }: any) {
    // const target: any = document.getElementById('form-balloon')
    // const planet_type: any = this.props.selectedStar
    // const project_id: any = this.props.currentProject.id

    // this.props.createAssignment(
    //   title,
    //   description,
    //   deadline,
    //   planet_type,
    //   planet_size,
    //   orbit_pos,
    //   project_id
    // )
    // this.props.resetSelectedStar()
    // target.style.display = 'none'
  }

  render() {
    return (
      <div id="form-on-modal">
        <div className="form-title">New Assignment</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <div className="form-line-1">
            <Field
              name="title"
              placeholder="title"
              type="text"
              component={InputField}
            />
            <Field
              name="deadline"
              placeholder="deadline"
              type="date"
              component={InputField}
            />
          </div>
          <div className="form-line-2">
            <Field
              name="description"
              placeholder="description"
              type="textarea"
              component={InputField}
            />
          </div>
          <div className="form-line-3">
            <Field
              name="planet_size"
              type="select"
              component={SelectField}
            />
            <button type="submit" className="form-btn assignment-fieled-text">
              決定
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function validate(values: any) {
  const errors: any = {}
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
    ({ selectedStar, currentProject }: any) => ({ selectedStar, currentProject }),
    { createAssignment, setSelectedStar, resetSelectedStar }
  )(AssignmentForm)
)
