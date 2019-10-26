class AssignmentSerializer
  include FastJsonapi::ObjectSerializer

  attribute :id
  attribute :title
  attribute :description
  attribute :deadline
  attribute :planet_type
  attribute :planet_size
  attribute :orbit_pos
  attribute :destroyed_at, if: @instance_options[:with_destroyed]
end
