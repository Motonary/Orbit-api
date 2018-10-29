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

require 'test_helper'

class AssignmentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
