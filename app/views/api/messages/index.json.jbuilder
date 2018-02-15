@messages.each do |message|
  json.set! message.id do
    json.extract! message, :id, :author_id, :channel_id, :body
    json.authorName message.author
    json.channelName message.channel
  end
end
