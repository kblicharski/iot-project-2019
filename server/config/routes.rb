Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  post 'debug', to: 'configs#debug', as: :debug
  resources :configs, only: %i[index create]
  resources :temperatures, only: %i[index create]
  resources :humidities, only: %i[index create]
  post 'heat_lamp', to: 'lamps#set_heat_lamp', as: :set_heat_lamp
  post 'light', to: 'lamps#set_light', as: :set_light
  post 'door/open', to: 'doors#open', as: :open
  get 'door/close', to: 'doors#close', as: :close
  get 'door/feed', to: 'doors#cricket_fed', as: :cricket_fed
end
