class AddMajorSectionIdToMinorSections < ActiveRecord::Migration
  def change
    add_column :minor_sections, :major_section_id, :integer
  end
end
