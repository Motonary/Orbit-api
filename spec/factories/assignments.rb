FactoryBot.define do
  factory :assignment do
    title { Faker::Movies::HarryPotter.house }
    description { Faker::Movies::HarryPotter.spell }
    deadline  { Faker::Time.forward(days: 23, period: :morning) }
    planet_type { Assignment.planet_types.keys[0] }
    planet_size { Assignment.planet_sizes.keys[0] }
    orbit_pos { Assignment.orbit_pos.keys[0] }
  end

  trait :with_destroyed do
    destroyed_flag  { true }
    destroyed_at  { Faker::Time.backward(days: 10, period: :evening) }
  end

  trait :with_done do
    done_flag  { true }
  end
end
