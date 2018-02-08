json.extract! @channel, :id, :name, :creator_id, :members, :purpose, :topic
json.creator @channel.creator
json.members @channel.members
