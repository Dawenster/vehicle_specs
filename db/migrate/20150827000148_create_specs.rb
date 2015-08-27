class CreateSpecs < ActiveRecord::Migration
  def change
    create_table :specs do |t|
      t.string  :name
      t.string  :spec_type
      t.text    :description
      t.string  :range_min
      t.string  :range_max
      t.string  :range_interval
      t.string  :range_default
      t.string  :unit_type
      t.string  :unit_of_measure
      t.string  :uom_abbreviation
      t.string  :default_precision
      t.text    :comments
      t.integer :vehicle_id
      t.integer :major_section_id
      t.integer :minor_section_id

      t.timestamps
    end
  end
end
