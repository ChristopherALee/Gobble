class AddLastVisitedChannelToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :last_visited_channel, :string, default: ""
  end
end
