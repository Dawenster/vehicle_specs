class PagesController < ApplicationController
  def landing
    @vehicle = Vehicle.first
    @range_precisions = ["Approximate", "Exact", "Max", "Min", "Within (Dual range)"]
  end
end