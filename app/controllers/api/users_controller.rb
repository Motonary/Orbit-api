class Api::UsersController < ApplicationController
  before_action :authenticate_user, except: :create

  def create
    new_user = User.create!(user_params)
    new_project = new_user.projects.create!(title: "PROJECT", fixed_star_type: 0, description: "This is your first Project!!")
    3.times do |i|
      new_project.assignments.create!({
        title: "TEST",
        description: "This is a Test Assignment to be destroyed",
        deadline: Time.zone.now + 15.days,
        planet_type: i,
        planet_size: 1,
        orbit_pos: i
      })
    end
    render json: UserSerializer.new(new_user)
  end

  def current
    render json: UserSerializer.new(current_user)
  end

  def remove_flag
    current_user = User.find_by(email: user_params[:email])
    current_user.first_visit_flag = false
    current_user.save! and render json: UserSerializer.new(current_user)
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

    current_user.save! and render json: UserSerializer.new(current_user)
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
