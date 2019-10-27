require 'rails_helper'

RSpec.describe UserSerializer do
  let!(:user) { create(:user) }
  let!(:serializer) { UserSerializer.new(user) }

  it "User is serialized with specific attributes" do
    expect(serializer.serialized_json).to eq({
      data: {
        id: "#{user.id}",
        type: "user",
        attributes: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: {
            url: user.avatar.url
          }
        }
      }
    }.to_json)
  end
end
