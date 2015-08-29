class MinorSection < ActiveRecord::Base
  has_many :specs, :dependent => :destroy
  belongs_to :vehicle
  belongs_to :major_section

  def unique_id
    "#{self.vehicle.id}-#{self.major_section.id}-#{self.id}"
  end
end