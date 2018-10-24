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

  validates :title, presence: true, length: { maximum: 30 }
  validates :fixed_star_type, presence: true, numericality: { less_than_or_equal_to: 4 }

  # TODO: たこ焼きとかサッカーボール追加
  enum fixed_star_type: { Earth: 0, Mars: 1, Venus: 2, Jupiter: 3, Saturn: 4 }
end
