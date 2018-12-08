require 'rails_helper'

RSpec.describe "Assignments", type: :request do
  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    { 'Authorization': "Bearer #{token}" }
  end

  describe "POST api/assignments/ but res 404 due to lack of params" do
    it "res new assignment" do
      user = FactoryBot.create(:user)
      post '/api/assignments/', headers: authenticated_header(user)
      expect(response.status).to eq 404
    end
  end

  describe "GET api/assignments/revolving" do
    before do
      @current_user = FactoryBot.create(:user)
      @current_user.projects << FactoryBot.create(:project)
      @current_project = @current_user.projects.first
      @assignment = @current_project.assignments.first
      @orbit_pos = ['primo', 'secundus', 'tertius']
    end

    it "res code 200" do
      get '/api/assignments/revolving', headers: authenticated_header(@current_user), params: { project_id: @current_project.id }
      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(@assignment.id).to eq json["#{@assignment.orbit_pos}"][0]["id"]
    end
  end
end
