Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    post '/signup' => 'users#create'

    post 'user_token' => 'user_token#create'
    get '/current_user' => 'user_token#current_user'
  end
end
