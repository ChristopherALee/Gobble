@direct_message_channel.messages.each do |message|
  json.set! message.id do
    json.extract! message, :id, :author_id, :direct_message_channel_id, :body, :created_at, :updated_at
    json.authorName message.author.username
    json.directMessageChannelId message.direct_message_channel.id
  end
end
