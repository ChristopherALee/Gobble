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
#

class Channel < ApplicationRecord
  validates :name, :creator_id, presence: true

  belongs_to :creator,
    class_name: 'User',
    foreign_key: :creator_id

  has_many :memberships,
    class_name: 'Membership',
    foreign_key: :channel_id

  has_many :members,
    through: :memberships, 
    source: :member
end
