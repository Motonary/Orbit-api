class SubAssignmentSerializer
  include FastJsonapi::ObjectSerializer

  attribute :id
  attribute :title
  attribute :description
  attribute :deadline
  attribute :planet_type
  attribute :planet_size
  attribute :orbit_pos
  attribute :destroyed_at, if: Proc.new { |obj, opts| opts[:with_destroyed] }
end
