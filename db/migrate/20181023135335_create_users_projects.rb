class CreateUsersProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :users_projects, id: false do |t|
      t.belongs_to :user, index: true
      t.belongs_to :project, index: true
    end
  end
end
