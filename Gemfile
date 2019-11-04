source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

gem 'rails', '~> 5.2.1'
gem 'puma', '~> 3.11'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'bcrypt'
gem 'rack-cors'
gem 'knock'
gem 'annotate'
gem 'mysql2'
gem 'aws-sdk-s3'
gem 'dotenv-rails'

# Use unicorn as the app server
gem "unicorn"
gem "unicorn-worker-killer"

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'faker'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'guard-rspec'
end

group :test do
  gem 'database_cleaner'  # テスト実行後にDBをクリア
  gem 'simplecov', :require => false    # テストカバレッジ(テストカバー率)
  gem 'minitest',                 '5.10.3'
  gem 'minitest-reporters',       '1.1.14'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
