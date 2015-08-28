class CreateSelections < ActiveRecord::Migration
  def change
    create_table :selections do |t|
      t.string  :name
      t.text    :description
      t.boolean :default

      t.timestamps
    end
  end
end
