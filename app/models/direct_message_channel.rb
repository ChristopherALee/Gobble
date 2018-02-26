# == Schema Information
#
# Table name: direct_message_channels
#
#  id         :integer          not null, primary key
#  creator_id :integer          not null
#  messages   :string           default([]), is an Array
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class DirectMessageChannel < ApplicationRecord
  validates :creator_id, presence: true

  belongs_to :creator,
    class_name: 'User',
    foreign_key: :creator_id

  has_many :memberships,
    class_name: 'DirectMessageChannelMembership',
    foreign_key: :direct_message_channel_id

  has_many :members,
    through: :memberships,
    source: :member

  has_many :messages,
    class_name: 'DirectMessage',
    foreign_key: :direct_message_channel_id
end
