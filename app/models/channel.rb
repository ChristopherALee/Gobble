# == Schema Information
#
# Table name: channels
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  creator_id :integer          not null
#  purpose    :string
#  topic      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  messages   :string           default([]), is an Array
#

class Channel < ApplicationRecord
  validates :name, :creator_id, presence: true
  validates :name, length: { maximum: 22, message: "Name must be shorter than 22 characters."}

  belongs_to :creator,
    class_name: 'User',
    foreign_key: :creator_id

  has_many :memberships,
    class_name: 'Membership',
    foreign_key: :channel_id

  has_many :members,
    through: :memberships,
    source: :member

  has_many :messages,
    class_name: 'Message',
    foreign_key: :channel_id
end
