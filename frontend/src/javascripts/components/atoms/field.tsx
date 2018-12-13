import * as React from 'react'
import { Field as ReduxFormField } from 'redux-form' // Fieldの命名被り防止
import classNames from 'classnames'

import '../../../stylesheets/field.scss'

interface Props {
  name: any,
  type: any,
  placeholder: any
}

export default class Field extends React.Component<Props, {}> {
  renderField({ placeholder, type, input, meta: { touched, error } }: any) {
    const fieldClasses = classNames({
      'has-danger': touched && error,
      'field-style': true,
      title: placeholder === 'title',
      description: placeholder === 'description',
      deadline: placeholder === 'deadline',
    })
    const inputClasses = classNames({
      title: placeholder === 'title',
      description: placeholder === 'description',
      deadline: placeholder === 'deadline',
    })
    return (
      <div className={fieldClasses}>
        <input
          className={inputClasses}
          placeholder={placeholder}
          type={type}
          {...input}
        />
        <div className="input-error">{touched ? error : ''}</div>
      </div>
    )
  }

  render() {
    const { name, type, placeholder } = this.props

    return (
      <ReduxFormField
        name={name}
        type={type}
        placeholder={placeholder}
        component={this.renderField}
      />
    )
  }
}
