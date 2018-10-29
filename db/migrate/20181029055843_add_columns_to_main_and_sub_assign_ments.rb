class AddColumnsToMainAndSubAssignMents < ActiveRecord::Migration[5.2]
  def change
    add_column :sub_assignments, :destroyed_at, :datetime
    add_column :sub_assignments, :destroyed_flag, :boolean, default: false
    add_column :assignments, :destroyed_at, :datetime
  end
end
