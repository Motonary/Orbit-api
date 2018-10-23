class RemoveColumnFromAssignments < ActiveRecord::Migration[5.2]
  def change
    remove_column :assignments, :user_id, :integer
  end
end
