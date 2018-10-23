class CreateAssignments < ActiveRecord::Migration[5.2]
  def change
    create_table :assignments do |t|
      t.string :title
      t.text :detail
      t.datetime :deadline
      t.integer :planet_type
      t.integer :planet_size
      t.integer :orbit_pos
      t.integer :project_id

      t.timestamps
    end
  end
end
