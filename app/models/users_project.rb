# == Schema Information
#
# Table name: users_projects
#
#  user_id    :integer
#  project_id :integer
#

class UsersProject < ApplicationRecord
  belongs_to :user
  belongs_to :project

  validates :user_id, presence: true
  validates :project_id, presence: true
end
