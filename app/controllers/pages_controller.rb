class PagesController < ApplicationController
  def landing
    @vehicle = Vehicle.first
  end
end