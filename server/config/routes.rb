Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  get 'app/state', to: 'configs#index', as: :index
  post 'app/settings', to: 'configs#create', as: :create
  resources :temperatures, only: %i[index create]
  get 'temperatures/most_recent', to: 'temperatures#most_recent', as: :most_recent_temperatures
  resources :humidities, only: %i[index create]
  get 'humidities/most_recent', to: 'humidities#most_recent', as: :most_recent_humidity
  post 'heat_lamp', to: 'lamps#set_heat_lamp', as: :set_heat_lamp
  post 'light', to: 'lamps#set_light', as: :set_light
  get 'door/open', to: 'doors#open', as: :open
  get 'door/close', to: 'doors#close', as: :close
  get 'door/feed', to: 'doors#cricket_fed', as: :cricket_fed
  get 'most_recent_feeding', to: 'doors#most_recent_feeding', as: :most_recent_feeding
  get 'active_feeding', to: 'doors#active_feeding', as: :active_feeding
  get 'all_feedings', to: 'doors#all_feedings', as: :all_feedings
  post 'light_schedule', to: 'lamps#set_light_schedule', as: :set_light_schedule
end
