Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    post '/signup' => 'users#create'

    # TODO: '/user_token' では？
    post 'user_token' => 'user_token#create'
    get 'user_token/jwt_token_and_user_info'
    get '/current_user' => 'user_token#current_user'
  end
end
