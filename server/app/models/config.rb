class Config < ApplicationRecord
  validates :high_temp, presence: true, numericality: { only_float: true }
  validates :low_temp, presence: true, numericality: { only_float: true }
  validates :high_humidity, presence: true, numericality: { only_float: true }
  validates :low_humidity, presence: true, numericality: { only_float: true }
end
