FactoryBot.define do
  factory :project do
    title { Faker::Movies::HarryPotter.house }
    description { Faker::Movies::HarryPotter.spell }
    fixed_star_type { Project.fixed_star_types.keys[0] }

    after(:create) do |project|
      create(:assignment, project: project)
      create(:assignment, :with_destroyed, project: project)
    end
  end
end
