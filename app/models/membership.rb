# == Schema Information
#
# Table name: memberships
#
#  id         :integer          not null, primary key
#  member_id  :integer          not null
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Membership < ApplicationRecord
  validates :member_id, :channel_id, presence: true

  belongs_to :member,
    class_name: 'User',
    foreign_key: :member_id

  belongs_to :channel,
    class_name: 'Channel',
    foreign_key: :channel_id
end
