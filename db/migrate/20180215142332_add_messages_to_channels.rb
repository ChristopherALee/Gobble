class AddMessagesToChannels < ActiveRecord::Migration[5.1]
  def change
    add_column :channels, :messages, :string, array: true, default: []
  end
end
