User.destroy_all
Project.destroy_all
Assignment.destroy_all
SubAssignment.destroy_all

fixed_star_keys = Project.fixed_star_types.keys
planet_keys = Assignment.planet_types.keys
size_keys = Assignment.planet_sizes.keys
pos_keys = Assignment.orbit_pos.keys

# A user
User.create!({
  name: 'ririco722',
  email: 'ririco722tomato@example.com',
  password: 'password',
  password_confirmation: 'password'
})

# A project
ririco = User.first

5.times do |i|
  ririco.projects.create!({
    title: Faker::HarryPotter.house,
    description: Faker::Lorem.sentence,
    fixed_star_type: fixed_star_keys[rand(0...4)]
  })
end

# Four assignments
kanojo_project = Project.first
4.times do |i|
  kanojo_project.assignments.create!({
    title: Faker::HarryPotter.character,
    description: Faker::HarryPotter.quote,
    deadline: Time.zone.local(2019, 01, 23, 00, 00, 00),
    planet_type: planet_keys[rand(0...10)],
    planet_size: size_keys[rand(0...2)],
    orbit_pos: pos_keys[rand(0...2)],
    destroyed_flag: false,
    destroyed_at: nil
  })
end

6.times do |i|
  kanojo_project.assignments.create!({
    title: Faker::Lorem.word,
    description: Faker::Lorem.sentence,
    deadline: Time.zone.local(2019, 01, 21, 00, 00, 00),
    planet_type: planet_keys[rand(0...10)],
    planet_size: size_keys[rand(0...2)],
    orbit_pos: pos_keys[rand(0...2)],
    destroyed_flag: true,
    destroyed_at: 1.days.ago
  })
end
2.times do |i|
  kanojo_project.assignments.create!({
    title: Faker::Lorem.word,
    description: Faker::Lorem.sentence,
    deadline: Time.zone.local(2019, 01, 29, 00, 00, 00),
    planet_type: planet_keys[rand(0...10)],
    planet_size: size_keys[rand(0...2)],
    orbit_pos: pos_keys[rand(0...2)],
    destroyed_flag: true,
    destroyed_at: Time.current.last_year
  })
end

# A sub_assignment
create_kanojo_assignment1 = Assignment.find_by(id: 2)
create_kanojo_assignment2 = Assignment.find_by(id: 8)

create_kanojo_assignment1.sub_assignments.create!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  deadline: Time.zone.local(2019, 01, 25, 00, 00, 00),
  planet_type: planet_keys[rand(0...10)],
})

create_kanojo_assignment2.sub_assignments.create!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  deadline: Time.zone.local(2019, 01, 25, 00, 00, 00),
  planet_type: planet_keys[rand(0...10)],
  destroyed_flag: true,
  destroyed_at: Time.current
})
