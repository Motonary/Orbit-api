class Api::AssignmentsController < ApplicationController
  before_action :authenticate_user
  before_action :set_current_project, only: [:fetch_revolving, :create]

  def set_current_project
    @current_project = Project.find(params[:project_id])
  end

  def fetch_revolving
    manageable_revolving_assignments = {
      'primo': Assignment.fetch_revolving_on_orbit(@current_project.id, 0).select_for_revolving,
      'secundus': Assignment.fetch_revolving_on_orbit(@current_project.id, 1).select_for_revolving,
      'tertius': Assignment.fetch_revolving_on_orbit(@current_project.id, 2).select_for_revolving
    }
    logger.debug "#{manageable_revolving_assignments}"
    render json: manageable_revolving_assignments
  end

  def fetch_destroyed
    destroyed_assignments = Assignment.fetch_with_user(current_user).fetch_destroyed.select_for_destroyed
    destroyed_sub_assignments = SubAssignment.fetch_with_user(current_user).fetch_destroyed.select_for_destroyed

    # 惑星と衛星を混ぜてから、破壊された日時の新しい順にソート
    destroyed_all_assignments =
      (destroyed_assignments + destroyed_sub_assignments).sort_by(&:destroyed_at)

    render json: shape_assignments(destroyed_all_assignments)
  end

  def create
    if @current_project.assignments.fetch_not_destroyed_in_orbit(assignment_params[:orbit_pos]).count < 5
      new_assignment = @current_project.assignments.new(assignment_params)
      new_assignment.save! and render json: new_assignment
    else
      head :no_content # TODO: statuscode204は不適切だから変えたい
    end
  end

  def destroy
    destroyed_assignment = Assignment.find(params[:id])
    destroyed_assignment.update_attributes(destroyed_flag: true, destroyed_at: Time.current) and head :ok
  end

  def restore
    restored_assignment = Assignment.find(params[:id])
    restored_assignment.update_attributes(destroyed_flag: false, destroyed_at: nil) and head :ok
  end

  private

    def assignment_params
      params.require(:assignment).permit(:title, :description, :deadline, :planet_type, :planet_size, :orbit_pos)
    end

    # 返すデータを{yyyy:{dd:[{...}, {...}, ...], dd:[{...}, ...], ...}, yyyy: {...}, ...}の形に整形
    def shape_assignments(destroyed_assignments)
      shaped_destroyed_assignments = {}

      destroyed_assignments.each do |assignment|
        year = assignment.destroyed_at.strftime('%Y')
        date = assignment.destroyed_at.strftime('%m/%d')

        if shaped_destroyed_assignments[year]
          if shaped_destroyed_assignments[year][date]
            shaped_destroyed_assignments[year][date].push assignment
          else
            shaped_destroyed_assignments[year][date] = [assignment]
          end
        else
          shaped_destroyed_assignments[year] = { date => [assignment] }
        end
      end
      logger.debug "#{shaped_destroyed_assignments}"
      shaped_destroyed_assignments
    end
end
