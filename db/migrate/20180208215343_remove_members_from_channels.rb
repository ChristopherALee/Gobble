class RemoveMembersFromChannels < ActiveRecord::Migration[5.1]
  def change
    remove_column :channels, :members
  end
end
