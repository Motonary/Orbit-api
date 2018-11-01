Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    post '/signup' => 'users#create'
    get '/current_user' => 'users#current'

    post 'user_token' => 'user_token#create'

    resources :projects, only: [:index, :create, :destroy]
    get 'projects/bar' => 'projects#fetch_on_bar'

    resources :assignments, only: :create
    get 'assignments/revolving' => 'assignments#fetch_revolving'
    get 'assignments/destroyed' => 'assignments#fetch_destroyed'
    patch 'assignments/:id/destroy' => 'assignments#destroy'
    patch 'assignments/:id/restore' => 'assignments#restore'
  end
end
