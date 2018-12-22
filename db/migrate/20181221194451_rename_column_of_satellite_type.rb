class RenameColumnOfSatelliteType < ActiveRecord::Migration[5.2]
  def change
    rename_column :sub_assignments, :satellite_type, :planet_type
  end
end
