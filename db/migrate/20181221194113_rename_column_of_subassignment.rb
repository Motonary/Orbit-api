class RenameColumnOfSubassignment < ActiveRecord::Migration[5.2]
  def change
    rename_column :sub_assignments, :detail, :description
  end
end
