json.extract! @channel, :id, :name, :creator_id, :purpose, :topic
json.memberIds @channel.members.map { |el| el.id }
