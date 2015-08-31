class AddContingencyToSpecs < ActiveRecord::Migration
  def change
    add_column :specs, :contingency, :boolean
  end
end
