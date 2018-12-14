import * as React from 'react'
import { connect } from 'react-redux'

import InputField from '../../atoms/input-field'

import {
  setSelectedStar,
  resetSelectedStar,
  resetModalStatus,
} from '../../../actions/common'
import { createProject } from '../../../actions/projects'

import '../../../../stylesheets/form_on_modal.scss'

interface ProjectFormProps {
  selectedStar: any,
  createProject: any,
  resetSelectedStar: any,
  resetModalStatus: any,
}

class ProjectForm extends React.Component<ProjectFormProps> {
  onSubmit({ title }: any) {
    const target: any = document.getElementById('form-balloon')
    const target_star: any = document.getElementsByClassName('current-clicked')[0]
    const fixed_star_type: any = this.props.selectedStar

    this.props.createProject(title, fixed_star_type)
    this.props.resetSelectedStar()
    target_star.classList.remove('current-clicked')
    target.style.display = 'none'

    this.props.createProject(title, fixed_star_type)
    this.props.resetSelectedStar()
    this.props.resetModalStatus()
  }

  render() {
    return (
      <div id="form-on-modal">
        <div className="form-title">New Project</div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-line-2">
            <InputField
              placeholder="title"
              name="title"
              type="text"
            />
          </div>
          <div className="form-line-4">
            <button type="submit" className="submit-btn assignment-fieled-text">
              決定
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(
  ({ selectedStar }: any) => ({ selectedStar }),
  { createProject, setSelectedStar, resetSelectedStar, resetModalStatus }
)(ProjectForm)