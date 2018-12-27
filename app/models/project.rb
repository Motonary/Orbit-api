# == Schema Information
#
# Table name: projects
#
#  id              :integer          not null, primary key
#  title           :string
#  fixed_star_type :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Project < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :assignments, dependent: :destroy

  validates :title, presence: true, length: { maximum: 50 }
  validates :fixed_star_type, presence: true

  enum fixed_star_type: [:Sun, :Venus, :Takoyaki, :Ball]

  scope :select_for_res, -> { select(:id, :title, :fixed_star_type) }
end
