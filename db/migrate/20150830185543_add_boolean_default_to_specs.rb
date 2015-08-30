class AddBooleanDefaultToSpecs < ActiveRecord::Migration
  def change
    add_column :specs, :boolean_default, :boolean
  end
end
