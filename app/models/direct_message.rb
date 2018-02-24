# == Schema Information
#
# Table name: direct_messages
#
#  id                        :integer          not null, primary key
#  author_id                 :integer          not null
#  direct_message_channel_id :integer          not null
#  body                      :text             not null
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#

class DirectMessage < ApplicationRecord
  
end
