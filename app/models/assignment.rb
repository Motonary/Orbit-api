# == Schema Information
#
# Table name: assignments
#
#  id             :integer          not null, primary key
#  title          :string
#  detail         :text
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
  belongs_to :project
  has_many :sub_assignments, dependent: :destroy

  validates :title, presence: true, length: { maximum: 50 }
  validates :detail, length: { maximum: 140 }
  validates :planet_type, presence: true
  validates :planet_size, presence: true
  validates :orbit_pos,   presence: true
  validates :project_id,  presence: true

  scope :fetch_revolving, -> (project_id) {
    where(project_id: project_id).where(destroyed_flag: false)
  }

  enum planet_type: [:Uranus, :Mercury, :Pluto, :Jupitar, :Earth, :Moon, :Neputune, :Sirius, :Love, :Mars, :Sun, :Venus, :Takoyaki, :Ball, :Egg]
  enum planet_size: [:small, :medium, :large]
  enum orbit_pos:   [:primo, :secundus, :tertius]

  scope :search_with_user, -> user { joins(project: :users).merge(User.id_is user.id) }
  scope :search_destroyed, -> { where(destroyed_flag: true) }
end
