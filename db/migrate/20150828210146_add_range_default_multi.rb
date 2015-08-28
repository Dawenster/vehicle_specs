class AddRangeDefaultMulti < ActiveRecord::Migration
  def change
    add_column :specs, :range_default_multi, :string
  end
end
