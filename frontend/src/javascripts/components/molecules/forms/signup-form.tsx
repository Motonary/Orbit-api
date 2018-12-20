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

interface CreateUserValues {
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
          onSubmit={(values: CreateUserValues, actions: any) => {
            this.props.createUser(
              values.username,
              values.email,
              values.password,
              values.confirmation
            )
            actions.setSubmitting(false)
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <InputField
                type="username"
                name="username"
                placeholder="USER NAME"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && touched.username && errors.username}
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
              {errors.confirmation && touched.confirmation && errors.confirmation}
              <FormSubmitBtn label="SIGN UP" isSubmit={isSubmitting} />
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
