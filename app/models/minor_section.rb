class MinorSection < ActiveRecord::Base
  has_many :specs, :dependent => :destroy
  belongs_to :vehicle
  belongs_to :major_section
end