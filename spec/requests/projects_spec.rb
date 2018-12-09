require 'rails_helper'

RSpec.describe "Projects", type: :request do
  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    { 'Authorization': "Bearer #{token}" }
  end

  before do
    @current_user = FactoryBot.create(:user)
    @current_user.projects << FactoryBot.create(:project)
    @current_project = @current_user.projects.first
  end

  describe "GET api/projects/" do

    it "res 200 and correct json" do

      get '/api/projects/', headers: authenticated_header(@current_user)
      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(@current_project.id).to eq json[0]["id"]
    end
  end
end