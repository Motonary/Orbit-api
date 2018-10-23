# == Schema Information
#
# Table name: planets
#
#  id          :integer          not null, primary key
#  planet_type :integer
#  planet_size :integer
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Planet < ApplicationRecord
  belongs_to :user
  has_one :assignment, dependent: :destroy, class_name: Assignment

  enum planet_type: { Earth: 0, Mars: 1, Venus: 2, Jupiter: 3, Saturn: 4 }
  enum planet_size: { small: 0, medium: 1, large: 2, satellite: 3 }

  validates :user_id,        presence: true
  validates :planet_type,    presence: true, numericality: { less_than_or_equal_to: 4 }
  validates :planet_size,    presence: true, numericality: { less_than_or_equal_to: 3 }
end
