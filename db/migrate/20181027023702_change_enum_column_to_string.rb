class ChangeEnumColumnToString < ActiveRecord::Migration[5.2]
  def change
    change_column :assignments, :planet_type, :string
    change_column :assignments, :planet_size, :string
    change_column :assignments, :orbit_pos, :string
    change_column :sub_assignments, :satellite_type, :string
  end
end
