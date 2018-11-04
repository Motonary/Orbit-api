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
    # new_avatar = params[:avatar]
    # path = Time.now.to_i.to_s + new_avatar.original_filename
    # output_path  = Rails.root.join('frontend/src/images/users/avatar', path)
    # debugger
    # if current_user.update_attribute(:avatar, path)
    #   File.open(output_path, 'w+b') { |fp| fp.write  new_avatar.tempfile.read }
    #   render json: path
    current_user.avatar = params[:avatar]
    current_user.save!
    # current_user.save! and render json: current_user.avatar.path
    # else
    #   head :internal_server_error
    # end
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
