class Assignment < ApplicationRecord
  belongs_to :planet

  validates :title, presence: true, length: { maximum: 15 }
  validates :detail, length: { maximum: 50 }
  validates :planet_id, presence: true
end
