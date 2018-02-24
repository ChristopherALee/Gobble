# == Schema Information
#
# Table name: direct_message_channel_memberships
#
#  id                        :integer          not null, primary key
#  member_id                 :integer          not null
#  direct_message_channel_id :integer          not null
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#

class DirectMessageChannelMembership < ApplicationRecord
  validates :member_id, :direct_message_channel_id, presence: true

  belongs_to :member,
    class_name: 'User',
    foreign_key: :member_id

  belongs_to :direct_message_channel,
    class_name: 'DirectMessageChannel',
    foreign_key: :direct_message_channel_id
end
