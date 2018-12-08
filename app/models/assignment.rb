# == Schema Information
#
# Table name: assignments
#
#  id             :integer          not null, primary key
#  title          :string
#  description    :text
#  deadline       :datetime
#  planet_type    :integer
#  planet_size    :integer
#  orbit_pos      :integer
#  project_id     :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  done_flag      :boolean          default(FALSE)
#  destroyed_flag :boolean          default(FALSE)
#  destroyed_at   :datetime
#

class Assignment < ApplicationRecord
  belongs_to :project, optional: true
  has_many :sub_assignments, dependent: :destroy

  validates :title, presence: true, length: { maximum: 50 }
  validates :description, length: { maximum: 140 }
  validates :planet_type, presence: true
  validates :planet_size, presence: true
  validates :orbit_pos,   presence: true
  validates :project_id,  presence: true

  enum planet_type: [:Uranus, :Mercury, :Pluto, :Jupitar, :Earth, :Moon, :Love, :Mars, :Neputune, :Sirius, :Sun, :Venus, :Takoyaki, :Ball, :Egg]
  enum planet_size: [:small, :medium, :large]
  enum orbit_pos:   [:primo, :secundus, :tertius]

  scope :fetch_with_user, -> user { joins(project: :users).merge(User.id_is user.id) }
  scope :fetch_destroyed, -> { where(destroyed_flag: true) }
  scope :fetch_revolving_on_orbit, -> (project_id, orbit_pos) {
    where(project_id: project_id).where(orbit_pos: orbit_pos).where(destroyed_flag: false)
  }
end
