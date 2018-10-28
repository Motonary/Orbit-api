class RenameSubAssignmentsTableColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :sub_assignments, :assignmant_id, :assignment_id
  end
end
