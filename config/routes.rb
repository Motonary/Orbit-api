Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    post '/signup' => 'users#create'
    get '/current_user' => 'users#current'

    post 'user_token' => 'user_token#create'

    resources :projects, only: [:index, :create, :destroy]
    resources :assignments, only: [:index, :create, :destroy]
  end
end
