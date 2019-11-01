class Api::AssignmentsController < ApplicationController
  before_action :authenticate_user
  before_action :set_belonged_assignment, only: [:create]

  def set_belonged_assignment
    @belonged_assignment = Assignment.find(params[:assignmnet_id])
  end

  def create
    new_sub_assignment = @belonged_assignment.sub_assignments.new(sub_assignment_params)
    new_sub_assignment.save! and render json: SubAssignmentSerializer.new(new_sub_assignment)
  end

  def destroy
    destroyed_sub_assignment = SubAssignment.find(params[:id])
    destroyed_sub_assignment.update_attributes(destroyed_flag: true, destroyed_at: Time.current) and head :ok
  end

  def restore
    restored_sub_assignment = SubAssignment.find(params[:id])
    restored_sub_assignment.update_attributes(destroyed_flag: false, destroyed_at: nil) and head :ok
  end

  private
    def sub_assignment_params
      params.require(:sub_assignment).permit(:title, :description, :deadline, :planet_type)
    end
end
