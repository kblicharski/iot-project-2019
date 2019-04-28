class TemperaturesController < ApplicationController
  require 'time'
  before_action :authenticate_user

  def index
    s = Time.at(params[:start].to_i / 1000)
    e = Time.at(params[:ending].to_i / 1000)
    temps = Temperature.where('created_at >= ? and created_at <= ?', s, e)
    json_response(temps)
  end

  def create
    t = Temperature.create!(temp_params)
    json_response(t, :created)
  end

  private

  def temp_params
    params.require(:temperature).permit(:value, :description)
  end
end
