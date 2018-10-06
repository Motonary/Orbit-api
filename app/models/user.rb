class User < ApplicationRecord
  validates :name, presense: true
  validates :email, presense: true
  validates :password, presense: true
end
