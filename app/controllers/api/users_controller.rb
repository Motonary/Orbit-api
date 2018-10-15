module Api
  class UsersController < ApplicationController
    def create
      debugger
      new_user = User.new(user_params)
      new_user.save and render json: []
    end
  end
end
