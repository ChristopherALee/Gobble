json.extract! @direct_message_channel, :id, :created_at
json.creatorName @direct_message_channel.creator.username
json.members @direct_message_channel.members.map { |member| member.username }
json.directMessages @direct_message_channel.messages.map { |message| message.id }
