Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    post 'users/create' => 'users#create'
  end
end
