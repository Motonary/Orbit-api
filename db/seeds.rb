User.destroy_all
Project.destroy_all
Assignment.destroy_all
SubAssignment.destroy_all

User.create!({
  name: 'ririco722',
  email: 'ririco722tomato@example.com',
  password: 'password',
  password_confirmation: 'password'
})
