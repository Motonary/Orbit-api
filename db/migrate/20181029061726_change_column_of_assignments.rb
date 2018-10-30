class ChangeColumnOfAssignments < ActiveRecord::Migration[5.2]
  def change
    change_column :assignments, :project_id, :integer
    change_column :sub_assignments, :assignment_id, :integer
  end
end
