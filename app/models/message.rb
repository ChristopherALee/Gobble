# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  channel_id :integer          not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Message < ApplicationRecord
  validates :author_id, :channel_id, :body, presence: true

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id

  belongs_to :channel,
    class_name: 'User',
    foreign_key: :channel_id
end
