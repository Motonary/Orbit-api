require 'rails_helper'

RSpec.describe AssignmentSerializer do
  let!(:project) { create(:project) }
  let!(:assignment) { create(:assignment, :with_destroyed, project: project) }
  let!(:serializer) { AssignmentSerializer.new(assignment, { opts: { with_destroyed: true }}) }

  it "Assignment is serialized with specific attributes" do
    puts serializer.serialized_json

    expect(serializer.serialized_json).to eq({
      data: {
        id: "#{assignment.id}",
        type: "assignment",
        attributes: {
          id: assignment.id,
          title: assignment.title,
          description: assignment.description,
          deadline: assignment.deadline,
          planet_type: assignment.planet_type,
          planet_size: assignment.planet_size,
          orbit_pos: assignment.orbit_pos
          # destroyed_at: assignment.destroyed_at
        }
      }
    }.to_json)
  end
end
