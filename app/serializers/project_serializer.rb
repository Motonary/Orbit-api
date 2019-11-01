class ProjectSerializer
  include FastJsonapi::ObjectSerializer

  attribute :id
  attribute :title
  attribute :description
  attribute :fixed_star_type
end
