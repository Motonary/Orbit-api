import * as React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import InputField from '../../atoms/input-field'

import {
  setSelectedStar,
  resetSelectedStar,
  resetModalStatus,
} from '../../../actions/common'
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
}

class ProjectForm extends React.Component<ProjectFormProps, {}> {
  render() {
    return (
      <div id="form-on-modal">
        <div className="form-title">New Project</div>
        <Formik
          initialValues={{ title: '' }}
          onSubmit={(values: CreateProjectValues, actions: any) => {
            const target: any = document.getElementById('form-balloon')
            const target_star: any = document.getElementsByClassName(
              'current-clicked'
            )[0]
            const fixed_star_type: any = this.props.selectedStar

            target_star.classList.remove('current-clicked')
            target.style.display = 'none'

            this.props.createProject(values.title, fixed_star_type)
            this.props.resetSelectedStar()
            this.props.resetModalStatus()
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
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
                {errors.title && touched.title && errors.title}
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
