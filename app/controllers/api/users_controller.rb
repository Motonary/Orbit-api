class Api::UsersController < ApplicationController
  before_action :authenticate_user, except: [:create]

  def create
    new_user = User.new(user_params)
    new_user.save and render json: new_user
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
