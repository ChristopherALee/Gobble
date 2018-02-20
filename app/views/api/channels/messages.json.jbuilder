@channel.messages.each do |message|
  json.set! message.id do
    json.extract! message, :id, :author_id, :channel_id, :body, :created_at, :updated_at
    json.authorName message.author.username
    json.channelName message.channel.name
  end
end
