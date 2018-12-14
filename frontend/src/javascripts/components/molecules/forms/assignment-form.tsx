import * as React from 'react'
import { connect } from 'react-redux'

import InputField from '../../atoms/input-field'
import SelectField from '../../atoms/select-field'

import {
  setSelectedStar,
  resetSelectedStar,
} from '../../../actions/common'
import { createAssignment } from '../../../actions/assignments'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn';

interface AssignmentFormProps {
  orbit: string,

  selectedStar: any,
  currentProject: any,

  setSelectedStar: any,
  resetSelectedStar: any,
  createAssignment: any,
}

interface createAssignmentProps {
  title: string, 
  description: string,
  deadline: string,
  planet_size: number,
  orbit_pos: number,
}

class AssignmentForm extends React.Component<AssignmentFormProps> {

  onSubmit({ title, description, deadline, planet_size, orbit_pos }: createAssignmentProps) {
    const planet_type: any = this.props.selectedStar            //reducerでの型付けと対応
    const project_id: number = this.props.currentProject.id

    this.props.createAssignment(
      title,
      description,
      deadline,
      planet_type,
      planet_size,
      orbit_pos,
      project_id
    )
    this.props.resetSelectedStar()
  }

  render() {
    return (
      <div id="form-on-modal">
        <div className="form-title">New Assignment</div>
        <form>
          <div className="form-line-1">
            <InputField
              name="title"
              type="text"
              placeholder="title"
            />
            <InputField
              name="deadline"
              type="date"
              placeholder="deadline"
            />
          </div>
          <div className="form-line-2">
            <InputField
              name="description"
              type="textarea"
              placeholder="description"
            />
          </div>
          <div className="form-line-3">
            <SelectField />
            <FormSubmitBtn label="決定" />
          </div>
        </form>
      </div>
    )
  }
}

// 参考資料として
// function validate(values: any) {
//   const errors: any = {}
//   //TODO: 現状validatが適当 → rails側と絡めて後々実装
//   if (!values.orbit_pos) {
//     errors.orbit_pos = 'Orbit Position required'
//   }

//   if (!values.title) {
//     errors.title = 'Title required'
//   } else if (values.title.length > 50) {
//     errors.title = 'Too long title'
//   }

//   if (!values.deadline) {
//     errors.deadline = 'deadline required'
//   }

//   if (!values.description) {
//     errors.description = 'Description required'
//   } else if (values.description.length > 140) {
//     errors.description = 'Too long description'
//   }
//   if (!values.planet_size) {
//     errors.planet_size = 'Orbit Position required'
//   }

//   return errors
// }

export default connect(
    ({ selectedStar, currentProject }: any) => ({ selectedStar, currentProject }),
    { createAssignment, setSelectedStar, resetSelectedStar }
  )(AssignmentForm)
