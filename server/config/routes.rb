Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  resources :configs, only: %i[index create]
  resources :temperatures, only: %i[index create]
  resources :humidities, only: %i[index create]
  resources :lights, only: %i[index create]
end
