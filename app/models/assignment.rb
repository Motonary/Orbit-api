# == Schema Information
#
# Table name: assignments
#
#  id             :integer          not null, primary key
#  title          :string
#  detail         :text
#  deadline       :datetime
#  planet_type    :string
#  planet_size    :string
#  orbit_pos      :string
#  project_id     :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  done_flag      :boolean          default(FALSE)
#  destroyed_flag :boolean          default(FALSE)
#

class Assignment < ApplicationRecord
  belongs_to :project
  has_many :sub_assignments, dependent: :destroy

  validates :title, presence: true, length: { maximum: 30 }
  validates :detail, length: { maximum: 140 }
  validates :planet_type, presence: true
  validates :planet_size, presence: true
  validates :orbit_pos,   presence: true
  validates :project_id,  presence: true

  enum planet_type: { Earth: 'Earth', Mars: 'Mars', Venus: 'Venus', Jupiter: 'Jupiter', Saturn: 'Saturn' }
  enum planet_size: { small: 'small', medium: 'medium', large: 'large' }
  enum orbit_pos:   { inside: 'inside', center: 'center', outside: 'outside' }
end
