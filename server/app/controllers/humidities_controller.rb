class HumiditiesController < ApplicationController
  require 'time'
  before_action :authenticate_user

  def index
    s = Time.at(params[:start].to_i / 1000)
    e = Time.at(params[:ending].to_i / 1000)
    humidities = Humidity.where('created_at >= ? and created_at <= ?', s, e)
    json_response(humidities)
  end

  def create
    h = Humidity.create!(humidity_params)
    json_response(h, :created)
  end

  def most_recent
    json_response(Humidity.last)
  end

  private

  def humidity_params
    params.require(:humidity).permit(:value, :description)
  end
end
