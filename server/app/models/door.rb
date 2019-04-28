class Door < ApplicationRecord
  validates :crickets_fed, numericality: { only_integer: true }
end