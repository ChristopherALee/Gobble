json.extract! @channel, :id, :name, :purpose, :topic
json.creatorName @channel.creator.username
json.memberIds @channel.members.map { |member| member.username }
