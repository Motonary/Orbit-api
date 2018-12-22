import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import InputField from '../../atoms/input-field'
import SelectField from '../../atoms/select-field'

import { setSelectedStar, resetSelectedStar, resetModalStatus } from '../../../actions/common'
import { createSubAssignment } from '../../../actions/subassignmnets'

import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

interface AssignmentFormProps {
  assignmentId: string

  selectedStar: any
  currentProject: any

  setSelectedStar: any
  resetSelectedStar: any
  resetModalStatus: any
  createSubAssignment: any
}

interface CreateSubAssignmentValues {
  title: string
  description: string
  deadline: string
  planet_size: string
}

class SubAssignmentForm extends React.Component<AssignmentFormProps> {
  render() {
    const satelite_type: any = this.props.selectedStar // reducerでの型付けと対応
    const { assignmentId } = this.props

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
          onSubmit={(values: CreateSubAssignmentValues, actions: any) => {
            this.props.createSubAssignment(
              values.title,
              values.description,
              values.deadline,
              satelite_type,
              values.planet_size,
              assignmentId
            )
            this.props.resetSelectedStar()
            this.props.resetModalStatus()
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
                  name={name}
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

const mapStateToProps = ({ selectedStar, currentProject }: any) => {
  return { selectedStar, currentProject }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    { setSelectedStar, resetSelectedStar, resetModalStatus, createSubAssignment },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubAssignmentForm)
