class ProjectsController < ApplicationController
  def new
    @vehicle = Vehicle.first
    @range_precisions = ["Approximately", "Exactly", "Max", "Min", "Within (Dual range)"]
  end
end