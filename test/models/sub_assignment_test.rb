# == Schema Information
#
# Table name: sub_assignments
#
#  id             :integer          not null, primary key
#  title          :string
#  detail         :text
#  deadline       :datetime
#  satellite_type :integer
#  assignment_id  :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class SubAssignmentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
