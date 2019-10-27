require 'rails_helper'

RSpec.describe "Assignments", type: :request do
  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    { 'Authorization': "Bearer #{token}" }
  end

  let!(:current_user) { create(:user, :with_project) }
  let!(:current_project) { current_user.projects.first }

  describe "POST api/assignments/" do
    let!(:user) { create(:user) }

    it "res 400(Bad Request) because of missing of params assignment" do
      post '/api/assignments/', headers: authenticated_header(user), params: { project_id: current_project.id }
      expect(response.status).to eq 400
    end
  end

  describe "GET api/assignmenet/destroyed" do
    let!(:destroyed_assignment) { current_project.assignments.last }

    it "res code 200 and shaped json" do
      get "/api/assignments/destroyed", headers: authenticated_header(current_user)
      expect(response.status).to eq 200

      json = JSON.parse(response.body)
      year = destroyed_assignment.destroyed_at.strftime("%Y")
      date = destroyed_assignment.destroyed_at.strftime("%m/%d")
      expect(destroyed_assignment.id).to eq json[year][date][0]["id"]
    end
  end

  describe "GET api/assignments/revolving" do
    let!(:assignment) { current_project.assignments.first }

    it "res code 200 and shaped json" do
      get '/api/assignments/revolving', headers: authenticated_header(current_user), params: { project_id: current_project.id }
      expect(response.status).to eq 200

      json = JSON.parse(response.body)
      expect(assignment.id).to eq json["#{assignment.orbit_pos}"][0]["id"]
    end
  end
end
