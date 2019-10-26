FactoryBot.define do
  #
  # Assignment
  #
  factory :assignment, class: Assignment do
    title { Faker::Movies::HarryPotter.house }
    description { Faker::Movies::HarryPotter.spell }
    deadline  { Faker::Time.forward(20, :morning) }
    planet_type { Assignment.planet_types.keys[rand(15)] }
    planet_size { Assignment.planet_sizes.keys[rand(3)] }
    orbit_pos { Assignment.orbit_pos.keys[rand(3)] }
  end

  factory :destroyed_assignment, parent: :assignment do
    destroyed_flag  { true }
    destroyed_at  { Faker::Time.backward(10, :evening) }
  end

  factory :done_assignment, parent: :assignment do
    done_flag  { true }
  end

  #
  # Project
  #
  factory :project, class: Project do
    title { Faker::Movies::HarryPotter.house }
    description { Faker::Movies::HarryPotter.spell }
    fixed_star_type { Project.fixed_star_types.keys[rand(15)] }

    after (:create) do |project|
      create(:assignment, project: project)
      create(:destroyed_assignment, project: project)
    end
  end

  #
  # User
  #
  factory :user, class: User do
    name { Faker::Movies::HarryPotter.character }
    email { Faker::Internet.email }
    password { Faker::Internet.password(8) }

    trait :project do
      project
    end
  end
end