FactoryBot.define do
  #
  # Assignment
  #
  factory :assignment, class: Assignment do
    title { Faker::HarryPotter.house }
    description { Faker::HarryPotter.quote }
    deadline  { Faker::Time.forward(20, :morning) }
    planet_type { rand(15) }
    planet_size { rand(3) }
    orbit_pos { rand(3) }
  end

  factory :destroyed_assignment, parent: :assignment do
    destroyed_flag  { true }
    destroyed_at  { Faker::Time.backword(10, :evening) }
  end

  factory :done_assignment, parent: :assignment do
    done_flag  { true }
  end

  #
  # Project
  #
  factory :project, class: Project do
    title { Faker::HarryPotter.house }
    fixed_star_type { rand(15) }

    after (:create) do |project|
      create(:assignment, project: project)
    end
  end

  #
  # User
  #
  factory :user, class: User do
    name { Faker::HarryPotter.character }
    email { Faker::Internet.email }
    password { Faker::Internet.password(8) }

    trait :project do
      project
    end
  end
end