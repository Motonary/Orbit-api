Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    post '/signup' => 'users#create'
    get '/current_user' => 'users#current'
    patch 'users/remove_flag' => 'users#remove_flag'
    post 'users/update_avatar' => 'users#update_avatar'
    patch 'users/update_profile' => 'users#update_profile'

    post 'user_token' => 'user_token#create'

    resources :projects, only: [:index, :create, :destroy]

    resources :assignments, only: :create
    get 'assignments/revolving' => 'assignments#fetch_revolving'
    get 'assignments/destroyed' => 'assignments#fetch_destroyed'
    patch 'assignments/:id/destroy' => 'assignments#destroy'
    patch 'assignments/:id/restore' => 'assignments#restore'

    resources :sub_assignments, only: :create
    patch 'sub_assignments/:id/destroy' => 'sub_assignments#destroy'
    patch 'sub_assignments/:id/restore' => 'sub_assignments#restore'
  end
end
