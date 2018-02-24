class CreateDirectMessageChannelMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :direct_message_channel_memberships do |t|
      t.integer :member_id, null: false
      t.integer :direct_message_channel_id, null: false
      t.timestamps
    end
  end
end
