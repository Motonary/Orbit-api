User.destroy_all

User.create!({
  name: 'ririco722',
  email: 'ririco722tomato@example.com',
  password: 'password',
  password_confirmation: 'password'
})

100.times do |n|
  User.create!(name: Faker::Name.first_name,
               email: Faker::Internet.email,
               password: "password",
               password_confirmation: "password",
               )
end
