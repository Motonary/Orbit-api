# == Schema Information
#
# Table name: sub_assignments
#
#  id             :integer          not null, primary key
#  title          :string
#  description    :text
#  deadline       :datetime
#  planet_type    :integer
#  assignment_id  :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  destroyed_at   :datetime
#  destroyed_flag :boolean          default(FALSE)
#

class SubAssignment < ApplicationRecord
  belongs_to :assignment

  validates :title, presence: true, length: { maximum: 50 }
  validates :description, presence: true, length: { maximum: 140 }
  validates :deadline, presence: true
  validates :planet_type, presence: true
  validates :assignment_id, presence: true

  enum planet_type: [:Uranus, :Mercury, :Pluto, :Jupitar, :Earth, :Moon, :Love, :Mars, :Neputune, :Sirius, :Egg]

  scope :fetch_with_user, -> user { joins(assignment: [project: :users]).merge(User.id_is user.id) }
  scope :fetch_destroyed, -> { where(destroyed_flag: true) }
  scope :select_for_destroyed, -> { select(:id, :title, :description, :deadline, :planet_type, :planet_size, :orbit_pos, :destroyed_at) }
end
