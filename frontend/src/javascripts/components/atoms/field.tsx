import * as React from 'react'
import { Field as ReduxFormField } from 'redux-form' // Fieldの命名被り防止

interface Props {
  name: any,
  type: any,
  placeholder: any
}

export default class Field extends React.Component<Props, {}> {
  renderField({ placeholder, type, input, meta: { touched, error } }: any) {
    const classNames = `${touched && error ? 'has-danger' : ''} field-style`
    return (
      <div className={classNames}>
        <input
          className="text-style"
          placeholder={placeholder}
          type={type}
          {...input}
        />
        <div className="text-help">{touched ? error : ''}</div>
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
