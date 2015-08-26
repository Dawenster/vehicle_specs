class AddVehicleIdToMajorSections < ActiveRecord::Migration
  def change
    add_column :major_sections, :vehicle_id, :integer
  end
end
