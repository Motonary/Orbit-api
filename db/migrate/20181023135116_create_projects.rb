class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :title
      t.integer :fixed_star_type

      t.timestamps
    end
  end
end
