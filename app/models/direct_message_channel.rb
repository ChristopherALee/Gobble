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
  
end
