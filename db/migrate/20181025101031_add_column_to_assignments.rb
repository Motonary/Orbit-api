class AddColumnToAssignments < ActiveRecord::Migration[5.2]
  def change
    add_column :assignments, :done_flag, :boolean, default: false
    add_column :assignments, :destroyed_flag, :boolean, default: false
  end
end
