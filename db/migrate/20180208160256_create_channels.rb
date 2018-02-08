class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.string :name, null: false, unique: true
      t.integer :creator_id, null: false
      t.string :members, array: true, default: []
      t.string :purpose
      t.string :topic
      t.timestamps
    end

    add_index :channels, :name, unique: true
  end
end
