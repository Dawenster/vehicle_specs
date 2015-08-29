class MajorSection < ActiveRecord::Base
  has_many :minor_sections, :dependent => :destroy
  has_many :specs, :dependent => :destroy
  belongs_to :vehicle

  def unique_id
    "#{self.vehicle.id}-#{self.id}"
  end
end