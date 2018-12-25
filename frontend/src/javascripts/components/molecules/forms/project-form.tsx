import * as React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import InputField from '../../atoms/input-field'

import { setSelectedStar, resetSelectedStar, resetModalStatus } from '../../../actions/common'
import { createProject } from '../../../actions/projects'

import '../../../../stylesheets/form_on_modal.scss'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

interface ProjectFormProps {
  selectedStar: any
  createProject: any
  resetSelectedStar: any
  resetModalStatus: any
}

interface CreateProjectValues {
  title: string
  description: string
}

class ProjectForm extends React.Component<ProjectFormProps, {}> {
  render() {
    return (
      <div id="form-on-modal">
        <div className="form-title">New Project</div>
        <Formik
          initialValues={{ title: '', description: '' }}
          validate={(values: CreateProjectValues) => {
            const errors: any = {}

            if (!values.title) {
              errors.title = 'Password required to update profile'
            } else if (values.title.length < 6) {
              errors.title = 'Password must contain at least 6 characters'
            }

            if (!values.description) {
              errors.description = 'Description required'
            } else if (values.description.length > 200) {
              errors.description = 'Too long description'
            }

            return errors
          }}
          onSubmit={(values: CreateProjectValues, actions: any) => {
            const fixed_star_type: any = this.props.selectedStar

            this.props.resetSelectedStar()
            this.props.resetModalStatus()
            this.props
              .createProject(values.title, values.description, fixed_star_type)
              .then(() => actions.setSubmitting(false))
              .catch(() => actions.setSubmitting(false))
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-line-2">
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
              <div className="form-line-4">
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
  ({ selectedStar }: any) => ({ selectedStar }),
  { createProject, setSelectedStar, resetSelectedStar, resetModalStatus }
)(ProjectForm)
