class Spec < ActiveRecord::Base
  has_many :selections, :dependent => :destroy
  belongs_to :vehicle
  belongs_to :major_section
  belongs_to :minor_section

  def unique_id
    "#{self.vehicle.id}-#{self.major_section.id}-#{self.minor_section.id}-#{self.id}"
  end

  def default_selection
    self.selections.select{|s|s.default}.first
  end
end