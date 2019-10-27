class UserSerializer
  include FastJsonapi::ObjectSerializer

  attribute :id
  attribute :name
  attribute :email
  attribute :avatar
end
