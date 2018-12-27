class AddDescriptionColumnToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :descirption, :text
  end
end
