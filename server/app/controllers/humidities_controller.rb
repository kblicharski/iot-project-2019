class HumiditiesController < ApplicationController
  require 'time'
  before_action :authenticate_user

  def index
    s = Humidity.at(params[:start].to_i / 1000)
    e = Humidity.at(params[:ending].to_i / 1000)
    humidities = Humidity.where('created_at >= ? and created_at <= ?', s, e)
    json_response(humidities)
  end

  def create
    h = Humidity.create!(humidity_params)
    json_response(h, :created)
  end

  private

  def humidity_params
    params.require(:humidity).permit(:value, :description)
  end
end
