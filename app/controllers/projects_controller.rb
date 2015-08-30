class ProjectsController < ApplicationController
  def new
    @vehicle = Vehicle.first
    @range_precisions = range_precisions
  end
end