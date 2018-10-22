class CreateAssignments < ActiveRecord::Migration[5.2]
  def change
    create_table :assignments do |t|
      t.string :title
      t.text :detail
      t.datetime :deadline
      t.integer :planet_id

      t.timestamps
    end
  end
end
