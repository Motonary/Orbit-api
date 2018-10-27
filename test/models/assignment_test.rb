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

require 'test_helper'

class AssignmentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
