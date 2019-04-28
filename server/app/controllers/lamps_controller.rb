class LampsController < ApplicationController
  require 'httparty'
  before_action :authenticate_user

  # Note: For some reason, these two actions always return a 500 error
  # despite working properly, not sure what this is all about
  def set_light
    l = Light.first
    l.update_attributes(on: params[:on])
    json_response(l, :updated)
  end

  def set_heat_lamp
    l = HeatLamp.first
    l.update_attributes(percentage: params[:percentage])
    json_response(l, :updated)
  end

end
