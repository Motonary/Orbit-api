class RenameColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :assignments, :detail, :description
  end
end
