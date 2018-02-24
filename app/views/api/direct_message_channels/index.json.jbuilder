@direct_message_channels do |channel|
  json.set! channel.id do
    json.extract! channel, :id, :creator_id, :created_at
    json.creatorName channel.creator.username
    json.members channel.members.map { |member| member.username }
    json.directMessages channel.messages.map{ |message| message.id }
  end
end
