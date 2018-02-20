json.extract! @message, :id, :author_id, :channel_id, :body, :created_at, :updated_at
json.authorName @message.author.username
json.channelName @message.channel.name
