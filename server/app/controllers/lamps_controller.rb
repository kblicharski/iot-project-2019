class LampsController < ApplicationController
  before_action :authenticate_user

  def set_light
    l = Light.first
    l.update_attributes(on: params[:on])
    json_response(l, :created)
  end

  def set_heat_lamp
    l = HeatLamp.first
    l.update_attributes(percentage: params[:percentage])
    json_response(l, :created)
  end

  def set_light_schedule
    c = Config.first
    c.update_attributes!(light_on_time: params[:light_on_time], light_off_time: params[:light_off_time])
    c.save!
  end

end
