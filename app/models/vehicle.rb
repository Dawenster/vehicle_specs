class Vehicle < ActiveRecord::Base
  has_many :major_sections, :dependent => :destroy
  has_many :minor_sections, :dependent => :destroy
  has_many :specs, :dependent => :destroy
end