class AddSpecIdToSelections < ActiveRecord::Migration
  def change
    add_column :selections, :spec_id, :integer
  end
end
