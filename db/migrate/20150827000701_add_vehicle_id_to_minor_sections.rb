class AddVehicleIdToMinorSections < ActiveRecord::Migration
  def change
    add_column :minor_sections, :vehicle_id, :integer
  end
end
