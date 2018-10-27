class RollbackEnumStringColumns < ActiveRecord::Migration[5.2]
  def change
    change_column :projects, :fixed_star_type, :integer
    change_column :assignments, :planet_type, :integer
    change_column :assignments, :planet_size, :integer
    change_column :assignments, :orbit_pos, :integer
    change_column :sub_assignments, :satellite_type, :integer
  end
end
