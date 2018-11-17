import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { updateAvatar, updateProfile, expireCurrentUser } from '../../actions/users'

class ProfileUpdateForm extends Component {
  renderField({ placeholder, type, input, meta: { touched, error } }) {
    const classNames = `form-group ${touched && error ? 'has-danger' : ''} field-style fieled-text`
    return(
      <div className={classNames}>
        <input
          className="text-style"
          placeholder={placeholder}
          type={type}
          {...input} />
        <div className="text-help">
          {touched? error : ''}
        </div>
      </div>
    )
  }

  onSelectAvatar(e) {
    if (window.confirm('アイコンを本当に変更しますか？')) this.props.updateAvatar(e.target.files[0])
  }

  onSubmit({ username, email, password, confirmation }) {
    // TODO: Flashメッセージの実装
    if (window.confirm('プロフィール情報を更新していいですか？')) {
      this.props.updateProfile(username, email, password, confirmation)
        .then(() => this.props.history.push('/'))
    }
  }

  onClickSignOutButton() {
    this.props.expireCurrentUser(() => this.props.history.push('/'))
  }

  render() {
    return(
      <div id="setting-page">
        <div className="avatar-wrapper">
          <div className="avatar-container">
            {/* TODO: Production環境ではURL変える */}
            <img src={`http://localhost:3000${this.props.currentUser.avatar.url}`} className="avatar" />
          </div>
        </div>
        <label className="submit-btn for-avatar">
          SELECT AVATAR
          <input className="display-none" name="avatar" accept='image/*' type="file" onChange={this.onSelectAvatar.bind(this)} />
        </label>
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="update-form">
          <Field placeholder="NAME" name="username" type="text" component={this.renderField} />
          <Field placeholder="EMAIL ADRESS" name="email" type="text" component={this.renderField} />
          <Field placeholder="PASSWORD" name="password" type="password" component={this.renderField} />
          <Field placeholder="CONFIRM PASSWORD" name="confirmation" type="password" component={this.renderField} />
          <button type="submit" className="submit-btn">UPDATE</button>
        </form>
        <button className="signout-btn" onClick={this.onClickSignOutButton.bind(this)}>SIGN OUT</button>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}

  if (values.username && values.username.length > 50) {
    errors.username = "Too long username"
  }

  if (values.email && values.email.length > 255) {
    errors.email = "Too long email address"
  } else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Password required to update profile"
  } else if (values.password.length < 6) {
    errors.password = "Password must contain at least 6 characters"
  }

  if (!values.confirmation) {
    errors.confirmation = "Password confirmation required"
  } else if (values.password !== values.confirmation) {
    errors.confirmation = "Not match password"
  }
  return errors
}

export default reduxForm({
  validate,
  form: 'ProfileUpdateForm'
})(connect(({ currentUser }) => ({ currentUser }), { updateAvatar, updateProfile, expireCurrentUser })(ProfileUpdateForm))
