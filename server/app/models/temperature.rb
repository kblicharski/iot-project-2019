class Temperature < ApplicationRecord
  validates :value, numericality: { only_float: true }
  validates :description, presence: true
end
