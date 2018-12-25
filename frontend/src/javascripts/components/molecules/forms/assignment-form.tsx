import * as React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import InputField from '../../atoms/input-field'
import SelectField from '../../atoms/select-field'

import { setSelectedStar, resetSelectedStar, resetModalStatus } from '../../../actions/common'
import { createAssignment } from '../../../actions/assignments'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

interface AssignmentFormProps {
  orbit: string

  selectedStar: any
  currentProject: any

  setSelectedStar: any
  resetSelectedStar: any
  resetModalStatus: any
  createAssignment: any
}

interface CreateAssignmentValues {
  title: string
  description: string
  deadline: string
  planet_size: string
}

class AssignmentForm extends React.Component<AssignmentFormProps> {
  render() {
    const planet_type: any = this.props.selectedStar // reducerでの型付けと対応
    const project_id: number = this.props.currentProject.id
    const { orbit } = this.props

    return (
      <div id="form-on-modal">
        <div className="form-title">New SubAssignment</div>
        <Formik
          initialValues={{
            title: '',
            description: '',
            deadline: '',
            planet_size: '',
          }}
          validate={(values: CreateAssignmentValues) => {
            const errors: any = {}
            // TODO: 現状validatが適当 → rails側と絡めて後々実装
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
          }}
          onSubmit={(values: CreateAssignmentValues, actions: any) => {
            this.props.resetSelectedStar()
            this.props.resetModalStatus()
            this.props
              .createAssignment(
                values.title,
                values.description,
                values.deadline,
                planet_type,
                values.planet_size,
                orbit,
                project_id
              )
              .then(() => actions.setSubmitting(false))
              .catch(() => actions.setSubmitting(false))
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-line-1">
                <InputField
                  type="title"
                  name="title"
                  placeholder="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div style={{ color: 'red' }}>{errors.title && touched.title && errors.title}</div>
                <InputField
                  type="date"
                  name="deadline"
                  placeholder="deadline"
                  value={values.deadline}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div style={{ color: 'red' }}>
                  {errors.deadline && touched.deadline && errors.deadline}
                </div>
              </div>
              <div className="form-line-2">
                <InputField
                  type="textarea"
                  name="description"
                  placeholder="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div style={{ color: 'red' }}>
                  {errors.description && touched.description && errors.description}
                </div>
              </div>
              <div className="form-line-3">
                <SelectField
                  name="planet_size"
                  value={values.planet_size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div style={{ color: 'red' }}>
                  {errors.planet_size && touched.planet_size && errors.planet_size}
                </div>
                <FormSubmitBtn label="決定" isSubmit={isSubmitting} />
              </div>
            </form>
          )}
        </Formik>
      </div>
    )
  }
}

export default connect(
  ({ selectedStar, currentProject }: any) => ({ selectedStar, currentProject }),
  { createAssignment, setSelectedStar, resetSelectedStar, resetModalStatus }
)(AssignmentForm)
