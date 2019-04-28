# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Light.destroy_all
HeatLamp.destroy_all

User.create!(name: 'Test', email: 'test@example.com', password: 'test', password_confirmation: 'test')
Config.create!(high_temp: 100, low_temp: 80, high_humidity: 50, low_humidity: 25, crickets_to_feed: 5)
Light.create!
HeatLamp.create!