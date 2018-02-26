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
  validates :author_id, :direct_message_channel_id, :body, presence: true

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id

  belongs_to :direct_message_channel,
    class_name: 'DirectMessageChannel',
    foreign_key: :direct_message_channel_id
end
