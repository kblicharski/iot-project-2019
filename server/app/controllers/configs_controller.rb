class ConfigsController < ApplicationController
  before_action :authenticate_user

  def index
    hash = Config.first.as_json(except: %i[id created_at updated_at])
    hash[:heat_lamp] = HeatLamp.first.percentage
    hash[:light] = Light.first.on
    hash[:crickets_fed] = Door.all.sum(:crickets_fed)

    door = Door.find_by(open: true)
    if door
      hash[:open_door] = door.as_json
    else
      hash[:open_door] = nil
    end
    json_response(hash)
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
