class CreateMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :memberships do |t|
      t.integer :member_id, null: false
      t.integer :channel_id, null: false
      t.timestamps
    end

    add_index :memberships, :member_id
    add_index :memberships, :channel_id
  end
end
