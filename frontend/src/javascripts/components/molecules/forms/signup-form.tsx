import * as React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import InputField from '../../atoms/input-field'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

import { createUser } from '../../../actions/users'

interface SignUpFormProps {
  history: any

  createUser: any
}

interface CreateUserProps {
  username: string
  email: string
  password: string
  confirmation: string
}

class SignUpForm extends React.Component<SignUpFormProps, {}> {
  render() {
    return (
      <div className="signup-form">
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmation: '',
          }}
          onSubmit={(values: CreateUserProps, { setSubmitting }) => {
            setTimeout(() => {
              this.props.createUser(
                values.username,
                values.email,
                values.password,
                values.confirmation,
                (newUserId: any) => {
                  this.props.history.push(`/users/${newUserId}`)
                }
              )
              setSubmitting(false)
            }, 400)
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <InputField
                type="email"
                name="email"
                placeholder="EMAIL ADRESS"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && errors.email}
              <InputField
                type="password"
                name="password"
                placeholder="PASSWORD"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && errors.password}
              <InputField
                type="password"
                name="confirmation"
                placeholder="CONFIRM PASSWORD"
                value={values.confirmation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmation &&
                touched.confirmation &&
                errors.confirmation}
              <FormSubmitBtn label="SIGN UP" disable={isSubmitting} />
            </form>
          )}
        </Formik>
      </div>
    )
  }
}

export default connect(
  null,
  { createUser }
)(SignUpForm)
