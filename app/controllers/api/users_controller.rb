class Api::UsersController < ApplicationController
  before_action :authenticate_user, except: [:create]

  def create
    new_user = User.new(name: params[:username], email: params[:email], password: params[:password])
    new_user.save and render json: new_user
  end

  def current
    # TODO: current_user?
    render json: current_user.as_json(only: %i(id email))
  end
end
