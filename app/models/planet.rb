class Planet < ApplicationRecord
  belongs_to :user
  has_one :assignment

  enum type: { Earth: 0, Mars: 1, Venus: 2, Jupiter: 3, Saturn: 4 }
  enum size: { small: 0, medium: 1, large: 2 }

  validates :user_id, presence: true
  validates :type,    presence: true, numericality: { less_than_or_equal_to: 4 }
  validates :size,    presence: true, numericality: { less_than_or_equal_to: 2 }
end
