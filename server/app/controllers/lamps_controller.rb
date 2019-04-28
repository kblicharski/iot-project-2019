class LampsController < ApplicationController
  before_action :authenticate_user

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
