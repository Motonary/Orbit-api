# == Schema Information
#
# Table name: planets
#
#  id          :integer          not null, primary key
#  planet_type :integer
#  planet_size :integer
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class PlanetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
