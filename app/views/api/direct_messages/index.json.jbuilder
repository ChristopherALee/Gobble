@direct_messages.each do |message|
  json.set! message.id do
    json.extract! message, :id, :author_id, :direct_message_channel_id, :body
    json.authorName message.author.username
  end
end
