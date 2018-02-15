json.extract! @message, :id, :author_id, :channel_id, :body
json.authorName @message.author
json.channelName @message.channel
