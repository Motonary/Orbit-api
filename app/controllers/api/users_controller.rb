class Api::UsersController < ApplicationController
  before_action :authenticate_user, except: :create

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
    current_user.name = user_params[:name] if user_params[:name]
    current_user.email = user_params[:email] if user_params[:email]
    current_user.password = user_params[:password]
    current_user.password_confirmation = params[:password_confirmation]
    current_user.save! and render json: current_user
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
