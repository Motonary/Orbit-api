class AddIndexToUsers < ActiveRecord::Migration[5.2]
  def change
    # リクエストが素早く複数回押された時は、データベースレベルで一意性を担保すれば良い
    add_index :users, :email, unique: true
  end
end
