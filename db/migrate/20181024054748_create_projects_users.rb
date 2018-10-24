class CreateProjectsUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :projects_users, id: false do |t|
      t.references :project, index: true, null: false
      t.references :users, index: true, null: false
    end
  end
end
