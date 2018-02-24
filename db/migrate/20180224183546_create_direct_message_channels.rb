class CreateDirectMessageChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :direct_message_channels do |t|
      t.integer :creator_id, null: false
      t.string :messages, array: true, default: []
      t.timestamps
    end
  end
end
