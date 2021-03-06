json.extract! @channel, :id, :name, :purpose, :topic, :created_at
json.creatorName @channel.creator.username
json.members @channel.members.map { |member| member.username }
json.messages @channel.messages.map { |message| message.id }
