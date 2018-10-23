class CreatePlanets < ActiveRecord::Migration[5.2]
  def change
    create_table :planets do |t|
      t.integer :planet_type
      t.integer :planet_size
      t.integer :user_id

      t.timestamps
    end
  end
end
