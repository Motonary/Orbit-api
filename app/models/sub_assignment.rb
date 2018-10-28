# == Schema Information
#
# Table name: sub_assignments
#
#  id             :integer          not null, primary key
#  title          :string
#  detail         :text
#  deadline       :datetime
#  satellite_type :integer
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

  enum planet_type: [:Uranus, :Mercury, :Pluto, :Jupitar, :Earth, :Moon, :Neputune,
                     :Sirius, :Love, :Mars, :Sun, :Venus, :Takoyaki, :Ball, :Egg]
end
