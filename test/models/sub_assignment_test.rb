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

require 'test_helper'

class SubAssignmentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
