class AddOnlineStatusToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :is_online, :boolean, default: false
  end
end
