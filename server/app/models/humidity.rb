class Humidity < ApplicationRecord
  validates :value, numericality: { only_float: true }
end
