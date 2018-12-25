import * as React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import InputField from '../../atoms/input-field'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

import { createSession } from '../../../actions/users'

interface SignInFormProps {
  history: any // historyの型付け

  createSession: any
}

interface CreateSessionValues {
  email: string
  password: string
}

class SignInForm extends React.Component<SignInFormProps, {}> {
  render() {
    return (
      <div className="signin-form">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values: CreateSessionValues, actions: any) => {
            this.props
              .createSession(values.email, values.password)
              .then(() => actions.setSubmitting(false))
              .catch(() => actions.setSubmitting(false))
          }}
          validate={(values: CreateSessionValues) => {
            const errors: any = {}

            if (!values.email) {
              errors.email = 'Email required'
            } else if (values.email && values.email.length > 255) {
              errors.email = 'Too long email address'
            } else if (
              values.email &&
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }

            if (!values.password) {
              errors.password = 'Password required to update profile'
            } else if (values.password.length < 6) {
              errors.password = 'Password must contain at least 6 characters'
            }

            return errors
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <InputField
                type="email"
                name="email"
                placeholder="EMAIL ADRESS"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div style={{ color: 'red' }}>{errors.email && touched.email && errors.email}</div>
              <InputField
                type="password"
                name="password"
                placeholder="PASSWORD"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div style={{ color: 'red' }}>
                {errors.password && touched.password && errors.password}
              </div>
              <FormSubmitBtn label="SIGN IN" isSubmit={isSubmitting} />
            </form>
          )}
        </Formik>
      </div>
    )
  }
}

export default connect(
  null,
  { createSession }
)(SignInForm)
