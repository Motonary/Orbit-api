# == Schema Information
#
# Table name: assignments
#
#  id         :integer          not null, primary key
#  title      :string
#  detail     :text
#  deadline   :datetime
#  planet_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Assignment < ApplicationRecord
  belongs_to :planet

  validates :title, presence: true, length: { maximum: 15 }
  validates :detail, length: { maximum: 50 }
  validates :planet_id, presence: true
end
