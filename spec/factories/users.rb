FactoryBot.define do
  factory :user do
    name { Faker::Movies::HarryPotter.character }
    email { Faker::Internet.email }
    password { Faker::Internet.password(min_length: 8) }
  end

  trait :with_project do
    projects { create_list(:project, 3) }
  end
end