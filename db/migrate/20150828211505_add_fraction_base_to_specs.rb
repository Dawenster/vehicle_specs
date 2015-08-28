class AddFractionBaseToSpecs < ActiveRecord::Migration
  def change
    add_column :specs, :fraction_base, :string
  end
end
