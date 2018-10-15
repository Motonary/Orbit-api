module Api
  class UsersController < ApplicationController
    def create
      new_user = User.new(name: params[:username], email: params[:email], password: params[:password])
      new_user.save and render json: new_user
    end
  end
end
