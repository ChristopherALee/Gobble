class CreateDirectMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :direct_messages do |t|
      t.integer :author_id, null: false
      t.integer :direct_message_channel_id, null: false
      t.text :body, null: false
      t.timestamps
    end
  end
end
