class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :dual_range_text

  def range_precisions
    ["Approximately", "Exactly", "Max", "Min", dual_range_text]
  end

  def dual_range_text
    "Within (Dual range)"
  end
end
