class ChangeColumnNameMistake < ActiveRecord::Migration[5.2]
  def change
    rename_column :projects_users, :users_id, :user_id
  end
end
