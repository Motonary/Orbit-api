# This option will make rspec enable to use Faker
RSpec.configure do |config|
  config.include FactoryBot::Syntax.Methods
end