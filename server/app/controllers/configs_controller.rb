class ConfigsController < ApplicationController
  before_action :authenticate_user

  def index
    json_response(Config.first)
  end

  def create
    c = Config.create!(config_params)
    Config.where.not(id: c.id).delete_all
    json_response(c, :created)
  end

  private

  def config_params
    params.require(:config).permit(:high_temp, :low_temp, :high_humidity, :low_humidity)
  end

end
