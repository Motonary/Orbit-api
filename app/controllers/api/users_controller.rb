class Api::UsersController < ApplicationController
  before_action :authenticate_user, only: [:current, :update_avatar]

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

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
