class CreateSubAssignments < ActiveRecord::Migration[5.2]
  def change
    create_table :sub_assignments do |t|
      t.string :title
      t.text :detail
      t.datetime :deadline
      t.integer :satellite_type
      t.integer :assignmant_id

      t.timestamps
    end
  end
end
