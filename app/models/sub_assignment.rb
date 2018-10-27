# == Schema Information
#
# Table name: sub_assignments
#
#  id             :integer          not null, primary key
#  title          :string
#  detail         :text
#  deadline       :datetime
#  satellite_type :string
#  assignmant_id  :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class SubAssignment < ApplicationRecord
  belongs_to :assignments

  validates :title, presence: true, length: { maximum: 15 }
  validates :detail, length: { maximum: 50 }
  validates :satellite_type, presence: true
  validates :assignmant_id, presence: true

  enum satellite_type: { Earth: 'Earth', Mars: 'Mars', Venus: 'Venus', Jupiter: 'Jupiter', Saturn: 'Saturn' }
end
