class RenameColumnOfDescriptionInProject < ActiveRecord::Migration[5.2]
  def change
    rename_column :projects, :descirption, :description
  end
end
