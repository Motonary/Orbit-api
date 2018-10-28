User.destroy_all
Project.destroy_all
Assignment.destroy_all
SubAssignment.destroy_all

# A user
User.create!({
  name: 'ririco722',
  email: 'ririco722tomato@example.com',
  password: 'password',
  password_confirmation: 'password'
})

# A project
ririco = User.first

ririco.projects.create!({
  title: 'Create kanojo',
  fixed_star_type: 'Earth'
})

# Four assignments
kanojo_project = Project.first

kanojo_project.assignments.create!({
  title: 'Prepare much water',
  detail: '35L is required',
  deadline: Time.new(2018, 12, 25, 00, 00, 00),
  planet_type: 'Mars',
  planet_size: 'large',
  orbit_pos: 'inside'
})

kanojo_project.assignments.create!({
  title: 'Prepare much carbon',
  detail: '20kg is required',
  deadline: Time.new(2018, 12, 25, 00, 00, 00),
  planet_type: 'Jupiter',
  planet_size: 'medium',
  orbit_pos: 'center'
})

kanojo_project.assignments.create!({
  title: 'Prepare a bit ammonia and so on',
  detail: '4L ammonia and a little lime, rin, fluorine is required',
  deadline: Time.new(2018, 12, 25, 00, 00, 00),
  planet_type: 'Saturn',
  planet_size: 'small',
  orbit_pos: 'inside'
})

kanojo_project.assignments.create!({
  title: 'Synthesize them!',
  detail: 'You\'ll get ideal kanojo and avoid lonely Christmas:)',
  deadline: Time.new(2018, 12, 25, 00, 00, 00),
  planet_type: 'Venus',
  planet_size: 'large',
  orbit_pos: 'outside'
})

# A sub_assignment
synthesis_assignment = Assignment.find(4)

synthesis_assignment.sub_assignments.create!({
  title: 'Say goodbye to your virginity',
  detail: 'Happy Christmas',
  satellite_type: 'Earth',
})
