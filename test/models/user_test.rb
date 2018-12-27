# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  name             :string
#  email            :string
#  password_digest  :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  avatar           :string
#  first_visit_flag :boolean          default(TRUE)
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(name: "ririco722", email: "utmafia510@example.com", password: "utmafia510")
  end

  test "should be valid" do
    assert @user.valid?
  end

  test "name should be present" do
    @user.name = "  "
    assert_not @user.valid?
  end

  test "name should be less than 50 chars" do
    @user.name = "a" * 51
    assert_not @user.valid?
  end

  test "email should be present" do
    @user.email = "  "
    assert_not @user.valid?
  end

  test "email should be less than 255 chars" do
    @user.email = "a" * 244 + "@example.com"
    assert_not @user.valid?
  end

  test "email should be valid" do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                         first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @user.email = valid_address
      assert @user.valid?, "#{valid_address.inspect} should be valid"
    end
  end

  test "email should be invalid" do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      assert_not @user.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end

  test "email should be unique" do
    duplicate_user = @user.dup
    duplicate_user.email = @user.email.upcase
    @user.save
    assert_not duplicate_user.valid?
  end

  test "email addresses should be saved as lower-case" do
    mixed_case_email = "Foo@ExAMPle.CoM"
    @user.email = mixed_case_email
    @user.save
    assert_equal mixed_case_email.downcase, @user.reload.email
  end

  test "password should be present(nonblank)" do
    @user.password = " " * 6
    assert_not @user.valid?
  end

  test "password should contain at least 6 chars" do
    @user.password = "a" * 5
    assert_not @user.valid?
  end
end
