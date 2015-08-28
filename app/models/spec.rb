class Spec < ActiveRecord::Base
  has_many :selections, :dependent => :destroy
  belongs_to :vehicle
  belongs_to :major_section
  belongs_to :minor_section
end