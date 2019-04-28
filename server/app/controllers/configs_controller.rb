class ConfigsController < ApplicationController
  before_action :authenticate_user, except: :debug

  def index
    hash = Config.first.as_json(except: %i[id created_at updated_at])
    hash[:heat_lamp] = HeatLamp.first.percentage
    hash[:light] = Light.first.on
    hash[:crickets_fed] = 0
    json_response(hash)
  end

  def create
    c = Config.create!(config_params)
    Config.where.not(id: c.id).delete_all
    json_response(c, :created)
  end

  def debug
    puts params
    json_response(params)
  end

  private

  def config_params
    params.require(:config).permit(:high_temp, :low_temp, :high_humidity, :low_humidity)
  end

end
