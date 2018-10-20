Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    post '/signup' => 'users#create'

    post 'user/token' => 'user_token#create'
    get 'users/current' => 'users#current'
  end
end
