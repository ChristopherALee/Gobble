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
  
end
