class Api::UsersController < ApplicationController
  before_action :authenticate_user, only: [:current, :update_avatar, :update_profile]

  def create
    new_user = User.new(user_params)
    new_user.save! and render json: new_user
  end

  def current
    render json: current_user
  end

  def update_avatar
    current_user.avatar = params[:avatar]
    current_user.save! and render json: current_user.avatar
  end

  def update_profile
    current_user.name = params[:name] if params[:name]
    current_user.email = params[:email] if params[:email]
    current_user.password = params[:password] if params[:password]
    current_user.save! and render current_user
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
