import * as React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import InputField from '../../atoms/input-field'
import SelectField from '../../atoms/select-field'

import { setSelectedStar, resetSelectedStar } from '../../../actions/common'
import { createAssignment } from '../../../actions/assignments'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

interface AssignmentFormProps {
  orbit: string

  selectedStar: any
  currentProject: any

  setSelectedStar: any
  resetSelectedStar: any
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
          onSubmit={(values: CreateAssignmentValues, actions: any) => {
            this.props.createAssignment(
              values.title,
              values.description,
              values.deadline,
              planet_type,
              values.planet_size,
              orbit,
              project_id
            )
            this.props.resetSelectedStar()
            actions.setSubmitting(false)
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
                {errors.title && touched.title && errors.title}
                <InputField
                  type="date"
                  name="deadline"
                  placeholder="deadline"
                  value={values.deadline}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.deadline && touched.deadline && errors.deadline}
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
              </div>
              <div className="form-line-3">
                <SelectField
                  name="planet_size"
                  value={values.planet_size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
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
  { createAssignment, setSelectedStar, resetSelectedStar }
)(AssignmentForm)
