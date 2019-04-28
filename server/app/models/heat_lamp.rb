class HeatLamp < ApplicationRecord
  validates :percentage, numericality: { only_float: true }
end
