class Api::AssignmentsController < ApplicationController
  before_action :authenticate_user
  before_action :set_current_project, only: [:fetch_revolving, :create]

  def set_current_project
    @current_project = Project.find(params[:project_id])
  end

  def fetch_revolving
    manageable_revolving_assignments = {
      'primo': Assignment.fetch_revolving_on_orbit(@current_project.id, 0),
      'secundus': Assignment.fetch_revolving_on_orbit(@current_project.id, 1),
      'tertius': Assignment.fetch_revolving_on_orbit(@current_project.id, 2)
    }
    render json: manageable_revolving_assignments
  end

  def fetch_destroyed
    destroyed_assignments = Assignment.fetch_with_user(current_user).fetch_destroyed
    destroyed_sub_assignments = SubAssignment.fetch_with_user(current_user).fetch_destroyed
    # 惑星と衛星を混ぜてから、破壊された日時の新しい順にソート
    destroyed_all_assignments =
      (destroyed_assignments + destroyed_sub_assignments).sort_by(&:destroyed_at).reverse

    # 返すデータを{yyyy:{dd:[{...}, {...}, ...], dd:[{...}, ...], ...}, yyyy: {...}, ...}の形に整形
    manageable_destroyed_assignments = {}

    destroyed_all_assignments.each do |assignment|
      year = assignment.destroyed_at.strftime('%Y')
      date = assignment.destroyed_at.strftime('%m/%d')
      if manageable_destroyed_assignments[year]
        if manageable_destroyed_assignments[year][date]
          manageable_destroyed_assignments[year][date].push assignment
        else
          manageable_destroyed_assignments[year][date] = [assignment]
        end
      else
        manageable_destroyed_assignments[year] = { date => [assignment] }
      end
    end
    render json: manageable_destroyed_assignments
  end

  def create
    new_assignment = @current_project.assignments.new(assignment_params)
    new_assignment.save! and render json: new_assignment
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
      params.require(:assignment).permit(:title, :detail, :deadline, :planet_type, :planet_size, :orbit_pos)
    end
end
